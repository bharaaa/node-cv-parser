const Resume = require("../model/resume");
const dictionary = require("./dictionaryRule");
const { parseRegular } = require("./helper/parseRegular");
const { parseProfiles } = require("./helper/parseProfiles");
const { parseTitles } = require("./helper/parseTitles");
const { parseInline } = require("./helper/parseInline");
const extractSkillsFromText = require("../utils/extractSkills");
const extractNameFromText = require("../utils/extractName");
const extractFormatPhoneNumber = require("../utils/extractFormatPhoneNumber");
const extractEducation = require("../utils/extractEducation");
const convertMonthYearToMMyyyy = require("../utils/convertMonthYearToMmyyyy");
const extractExperience = require("../utils/extractExperience");

// const CvParser = async (file) => {
//   try {
//     if (!file) throw new Error("file is not defined");

//     const resume = new ResumeParser(file);
//     const parsed = await resume.parseToJSON();
//     const data = parsed.parts;
//     console.log("parsed data from simpleresumeparser: ", parsed);

//     if (data.profiles && !/^https?:\/\//i.test(data.profiles)) {
//       data.profiles = "https://" + data.profiles;
//     }

//     const outputDir = path.join(__dirname, "../../converted");
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }

//     const outputFilename = `resume_${Date.now()}.json`;
//     const outputPath = path.join(outputDir, outputFilename);
//     fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

//     return { success: true, data };
//   } catch (error) {
//     console.error("CvParser error:", error);
//     return { success: false, error: error.message };
//   }
// };

const CvParser = async (rawText) => {
  try {
    if (!rawText) throw new Error("No resume text provided");

    const resume = new Resume();
    const rows = rawText.split("\n").map((line) => line.trim());

    // 1. Regex search on the entire file (name, email, etc.)
    parseRegular(rawText, resume);

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // 2. Extract profile links
      rows[i] = parseProfiles(row, resume);

      // 3. Extract section titles (education, work experience, etc.)

      // 4. Inline values like "Phone: 08123"
      parseInline(row, resume);
    }
    parseTitles(resume, rows);

    const extractedname = extractNameFromText(rawText);
    resume.addKey("name", extractedname);

    const extractedSkills = extractSkillsFromText(rawText);
    resume.addKey("skills", extractedSkills.join(", "));

    const extractedPhone = extractFormatPhoneNumber(rawText);
    resume.addKey("phone", extractedPhone);

    const extractedRawSkills = resume.getKey("skills");
    if (extractedRawSkills && extractedRawSkills.length !== 0) {
      console.log("extractedrawskills: ", extractedRawSkills.toString());
    }
    console.log("final parsed resume: ", resume.parts);

    const educationEntries = extractEducation(resume.getKey("educationParts"));
    console.log("educationEntries: ", educationEntries);
    const experienceEntries = extractExperience(
      resume.getKey("experienceParts")
    );
    console.log("experienceEntries: ", experienceEntries);

    // 2. Convert + add new fields
    const convertedEducationEntries = educationEntries.map((entry) => ({
      ...entry,
      eduStartDate: convertMonthYearToMMyyyy(entry.eduStartDate),
      eduEndDate: convertMonthYearToMMyyyy(entry.eduEndDate),
    }));
    console.log("convertedEducationEntries: ", convertedEducationEntries);

    const convertedExperienceEntries = experienceEntries.map((entry) => ({
      ...entry,
      workStartDate: convertMonthYearToMMyyyy(entry.workStartDate),
      workEndDate: convertMonthYearToMMyyyy(entry.workEndDate),
    }));
    console.log("convertedExperienceEntries: ", convertedExperienceEntries);

    resume.addKey("educationEntries", convertedEducationEntries);
    resume.addKey("experienceEntries", convertedExperienceEntries);

    // const workStartDates = experienceEntries.map(
    //   (entry) => entry.workStartDate
    // );
    // const convertedWorkStartDate = convertMonthYearToMMyyyy(
    //   workStartDates.toString()
    // );
    // resume.addKey("expStartDate", convertedWorkStartDate);

    // const workEndDates = experienceEntries.map((entry) => entry.workEndDate);
    // const convertedWorkEndDate = convertMonthYearToMMyyyy(
    //   workEndDates.toString()
    // );
    // resume.addKey("expEndDate", convertedWorkEndDate);

    // const eduStartDates = educationEntries.map((entry) => entry.eduStartDate);
    // const convertedEduStartDate = convertMonthYearToMMyyyy(
    //   eduStartDates.toString()
    // );
    // resume.addKey("eduStartDate", convertedEduStartDate);

    // const eduEndDates = educationEntries.map((entry) => entry.eduEndDate);
    // const convertedEduEndDate = convertMonthYearToMMyyyy(
    //   eduEndDates.toString()
    // );
    // resume.addKey("eduEndDate", convertedEduEndDate);

    return { success: true, data: resume.parts };
  } catch (error) {
    console.error("CvParser error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = CvParser;
