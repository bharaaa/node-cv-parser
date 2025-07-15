const fs = require("fs");
const pdfParse = require("pdf-parse");

/**
 * Extracts raw text from a PDF file at a given path
 * @param {string} filePath - Full path to the PDF file
 * @returns {Promise<string>} - Extracted raw text
 */
const extractTextFromPDF = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text;
  } catch (err) {
    console.error("❌ Error extracting PDF text:", err.message);
    throw new Error("Failed to extract text from PDF");
  }
};

module.exports = extractTextFromPDF;
