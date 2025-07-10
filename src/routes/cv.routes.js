const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const cvController = require("../controller/cv.controller");

router.post("/upload", upload.single("file"), cvController.uploadCV);
router.get("/all", cvController.getAllCVs);
router.get("/download/:id", cvController.downloadCV);
router.post("/parse", upload.single("resume"), cvController.parseCV);

module.exports = router;
