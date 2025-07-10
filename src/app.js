const express = require("express");
const cors = require("cors");
const cvRoutes = require("./routes/cv.routes");
const fs = require("fs");
const path = require("path");
const cleanupKeepLatest = require("./utils/cleanupFolder");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cv", cvRoutes);

// Ensure 'converted' folder exists
const convertedPath = path.join(__dirname, "../converted");
if (!fs.existsSync(convertedPath)) {
  fs.mkdirSync(convertedPath);
}
const resumePath = path.join(__dirname, "../resume");

cleanupKeepLatest(resumePath, 5);
cleanupKeepLatest(convertedPath, 5);

module.exports = app;
