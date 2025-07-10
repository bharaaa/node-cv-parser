const pool = require("../config/db");
const fs = require("fs");
const os = require("os");
const path = require("path");
const CvParser = require("../services/cvParser.service");

exports.uploadCV = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).send("No file uploaded.");

    const result = await pool.query(
      `INSERT INTO cv_db (filename, filetype, data, uploaded_at)
       VALUES ($1, $2, $3::bytea, NOW()) RETURNING id`,
      [file.originalname, file.mimetype, file.buffer]
    );

    const insertedId = result.rows[0].id;
    res.status(200).send(`File uploaded with ID: ${insertedId}`);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Upload failed");
  }
};

exports.getAllCV = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cv_db ORDER BY uploaded_at DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get all error:", error);
    res.status(500).send("Error fetching data.");
  }
};

exports.downloadCV = async (req, res) => {
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
    res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.setHeader("Content-Type", file.filetype);
    res.send(file.data);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Error downloading file.");
  }
};

exports.parseCV = async (req, res) => {
  let tempFilePath = "";

  try {
    const file = req.file;
    tempFilePath = path.join(os.tmpdir(), file.originalname);
    fs.writeFileSync(tempFilePath, file.buffer);

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
};
