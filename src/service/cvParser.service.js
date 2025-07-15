const ResumeParser = require("simple-resume-parser");
const fs = require("fs");
const path = require("path");

const CvParser = async (file) => {
  try {
    if (!file) throw new Error("file is not defined");

    const resume = new ResumeParser(file);
    const parsed = await resume.parseToJSON();
    const data = parsed.parts;
    console.log("parsed data from simpleresumeparser: ", parsed);

    if (data.profiles && !/^https?:\/\//i.test(data.profiles)) {
      data.profiles = "https://" + data.profiles;
    }

    const outputDir = path.join(__dirname, "../../converted");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputFilename = `resume_${Date.now()}.json`;
    const outputPath = path.join(outputDir, outputFilename);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    return { success: true, data };
  } catch (error) {
    console.error("CvParser error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = CvParser;
