const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const cvController = require("../controller/cv.controller");
const exportController = require("../controller/export.controller");

router
  .route("/")
  .get(cvController.getAllCV)
  .post(upload.single("file"), cvController.uploadCV); // POST /api/cv
router.get("/latest", cvController.getLatestCV);
router.get("/download/:id", cvController.downloadCV);
router.post("/parse", upload.single("resume"), cvController.parseCV);
router.get("/parse/:id", cvController.parseById);
router.post("/export", exportController.exportExtractedToExcel);

module.exports = router;
