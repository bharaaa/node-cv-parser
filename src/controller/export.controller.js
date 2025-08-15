const fs = require("fs");
const os = require("os");
const path = require("path");
const ExcelJS = require("exceljs");
const pool = require("../config/db");
const CvParser = require("../service/cvParser.service");
const mapCV = require("../service/cvMapping.service");

exports.exportExtractedToExcel = async (req, res) => {
  const editedProfile = req.body;

  console.log("editedProfile from frontend: ", editedProfile);

  // Helper to set value + wrap text
  const setCellValue = (cell, value) => {
    cell.value = value || "";
    cell.alignment = { wrapText: true, vertical: "top" };
  };

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(
      path.join(__dirname, "../../asset/IDB_Member_CV_2025_Name.xlsx")
    );
    const sheet = workbook.getWorksheet(1);

    // --- Basic fields ---
    setCellValue(sheet.getCell("C7"), editedProfile.fullname);
    setCellValue(sheet.getCell("G8"), editedProfile.email);
    setCellValue(
      sheet.getCell("C11"),
      `+${editedProfile.areaCode || ""} ${editedProfile.phoneNumber || ""}`
    );
    setCellValue(sheet.getCell("C12"), editedProfile.domicile);

    // --- Career ---
    const careerStartRow = 24;
    editedProfile.career?.forEach((career, i) => {
      const rowIdx = careerStartRow + i;
      setCellValue(sheet.getCell(`B${rowIdx}`), career.startDate);
      setCellValue(sheet.getCell(`C${rowIdx}`), career.endDate);
      setCellValue(sheet.getCell(`G${rowIdx}`), career.position);
      setCellValue(sheet.getCell(`E${rowIdx}`), career.name);
      setCellValue(sheet.getCell(`I${rowIdx}`), career.responsibility);
    });

    // --- Education ---
    const eduStartRow = 16;
    editedProfile.edu?.forEach((edu, i) => {
      const rowIdx = eduStartRow + i;
      setCellValue(sheet.getCell(`D${rowIdx}`), edu.institution);
      setCellValue(sheet.getCell(`G${rowIdx}`), edu.fieldOfStudy);
      setCellValue(sheet.getCell(`H${rowIdx}`), edu.grade);
      setCellValue(sheet.getCell(`I${rowIdx}`), edu.degree);
    });

    // --- Skills ---
    const skillStartRow = 99;
    editedProfile.skill?.forEach((skill, i) => {
      const rowIdx = skillStartRow + i;
      setCellValue(sheet.getCell(`B${rowIdx}`), skill.skillName);
    });

    // --- Skill Languages ---
    const skillLangStartRow = 48;
    editedProfile.skillLanguage?.forEach((lang, i) => {
      if (lang.skillName === "English" || lang.skillName === "Korean") {
        const rowIdx = skillLangStartRow + i;
        setCellValue(sheet.getCell(`B${rowIdx}`), lang.skillName);
      }
    });

    // Send as download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=filled_cv.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating CV Excel:", error);
    res.status(500).json({ error: "Failed to generate CV Excel" });
  }
};
