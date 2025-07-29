const fs = require("fs");
const os = require("os");
const path = require("path");
const ExcelJS = require("exceljs");
const pool = require("../config/db");
const CvParser = require("../service/cvParser.service");
const mapCV = require("../service/cvMapping.service");

exports.exportExtractedToExcel = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT filename, data FROM cv_db WHERE id = $1",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ success: false, error: "CV not found" });
    }

    const { filename, data } = result.rows[0];
    const tempPath = path.join(os.tmpdir(), `${Date.now()}-${filename}`);
    fs.writeFileSync(tempPath, data);

    const parsed = await CvParser(tempPath);
    if (!parsed.success) {
      throw new Error(parsed.error || "Parsing failed");
    }

    const mapped = mapCV(parsed.data, parsed.rawText || "");

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Extracted CV");

    sheet.columns = [
      { header: "Field", key: "field", width: 30 },
      { header: "Value", key: "value", width: 50 },
    ];

    const flatFields = {
      ...mapped.personalInfo,
      ...mapped.formalEducation,
      ...mapped.informalEducation,
      ...mapped.careerInfo,
    };

    const rows = Object.entries(flatFields).map(([field, value]) => ({
      field,
      value: Array.isArray(value) ? value.join(", ") : value,
    }));

    sheet.addRows(rows);

    const excelPath = path.join(os.tmpdir(), `resume_${id}.xlsx`);
    await workbook.xlsx.writeFile(excelPath);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=resume_${id}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    const stream = fs.createReadStream(excelPath);
    stream.pipe(res);

    stream.on("end", () => {
      fs.unlinkSync(tempPath);
      fs.unlinkSync(excelPath);
    });
  } catch (err) {
    console.error("Backend Excel Export Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
