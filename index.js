const express = require("express");
const multer = require("multer");
const pool = require("./db");
const app = express();
const cors = require("cors");
const PORT = 3000;
const fs = require("fs");
const os = require("os");

const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "resume"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage: multer.memoryStorage() });
const CvParser = require("./CvParser");

app.use(cors());

app.post("/api/cv/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    console.log("file: ", file);
    console.log("filename: ", file.originalname);

    const result = await pool.query(
      `INSERT INTO cv_db (filename, filetype, data, uploaded_at)
       VALUES ($1, $2, $3::bytea, NOW()) RETURNING id`,
      [file.originalname, file.mimetype, file.buffer]
    );

    console.log("query: ", result);

    const insertedId = result.rows[0].id;

    res.status(200).send(`File uploaded with ID: ${insertedId}`);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Upload failed");
  }
});

app.get("/api/cv/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM cv_db ORDER BY uploaded_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get all error:", error);
    res.status(500).send("Error fetching data.");
  }
});

app.get("/api/cv/download/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      "SELECT filename, filetype, data FROM cv_db WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("CV not found.");
    }

    const file = result.rows[0];
    console.log("file from download api: ", file);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );
    res.setHeader("Content-Type", file.filetype);
    res.send(file.data);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Error downloading file.");
  }
});

// Ensure 'converted' folder exists
if (!fs.existsSync(path.join(__dirname, "converted"))) {
  fs.mkdirSync(path.join(__dirname, "converted"));
}

// Upload route
app.post("/parse", upload.single("resume"), async (req, res) => {
  let tempFilePath = "";
  try {
    const tempFilePath = path.join(os.tmpdir(), req.file.originalname);
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const result = await CvParser(tempFilePath);

    res.json(result);
  } catch (err) {
    console.error("🔥 /parse error:", err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    try {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    } catch (cleanupErr) {
      console.warn("⚠️ Temp file cleanup failed:", cleanupErr.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Resume parser API running at http://localhost:${PORT}`);
});
