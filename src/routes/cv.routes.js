const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const cvController = require("../controller/cv.controller");

router
  .route("/")
  .get(cvController.getAllCV)
  .post(upload.single("file"), cvController.uploadCV); // POST /api/cv
router.get("/download/:id", cvController.downloadCV);
router.post("/parse", upload.single("resume"), cvController.parseCV);

module.exports = router;
