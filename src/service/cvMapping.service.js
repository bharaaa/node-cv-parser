const {} = require("../types/cv.types");
const {
  cleanLines,
  removeStopWords,
  cleanInstitutionName,
} = require("../utils/textHelper");
const { regexes } = require("../utils/regexes");


/**
 * Maps raw parsed data into structured fields.
 * @param {Object} parsedData
 * @returns {ParsedCVData}
 */
function mapCV(parsed, rawText) {
  const text = rawText || "";
  const lines = cleanLines(text);
  const firstLine = lines[0] || text.slice(0, 150);
  const regex = regexes.regex;

  // --- Formal education
  const formalMatch = text
    .match(regex.educationDates)?.[0]
    ?.match(
      /([A-Za-z]+\.?\s?\d{4})\s*[-–]\s*(Present|Now|Sekarang|[A-Za-z]+\.?\s?\d{4})/i
    );
  const parsedFormal = {
    extractedDegree: parsed.degree || "N/A",
    extractedInstitutionName:
      parsed.institution ||
      cleanInstitutionName(text.match(regex.institution)) ||
      "N/A",
    extractedFieldOfStudy: parsed.fieldOfStudy || "N/A",
    extractedFormalStartDate: formalMatch?.[1] || "N/A",
    extractedFormalEndDate: formalMatch?.[2] || "N/A",
    extractedGrade: parsed.gpa || text.match(regex.gpa)?.[1] || "N/A",
    extractedFormalCertificate: "",
    extractedEducation: parsed.education || "",
  };

  // --- Informal education
  const informalMatch = text
    .match(regex.informalEducationDates)?.[0]
    ?.match(
      /([A-Za-z]+\.?\s?\d{4})\s*[-–]\s*(Present|Now|Sekarang|[A-Za-z]+\.?\s?\d{4})/i
    );
  const parsedInformal = {
    extractedInformalEduName: parsed.informalEduName || "N/A",
    extractedOrganizationName: parsed.informalOrgName || "N/A",
    extractedInformalStartDate: informalMatch?.[1] || "N/A",
    extractedInformalEndDate: informalMatch?.[2] || "N/A",
    extractedInformalCertificate: "",
  };

  // --- Career
  const companyMatch = text
    .match(regex.companyDates)?.[0]
    ?.match(
      /([A-Za-z]+\.?\s?\d{4})\s*[-–]\s*(Present|Now|Sekarang|[A-Za-z]+\.?\s?\d{4})/i
    );
  const parsedCareer = {
    extractedCompanyHistory: parsed.companyHistory || "N/A",
    extractedHistoryPosition: parsed.position || "N/A",
    extractedCompanyHistoryStartDate: companyMatch?.[1] || "N/A",
    extractedCompanyHistoryEndDate: companyMatch?.[2] || "N/A",
    extractedEmploymentType: parsed.employmentType || "N/A",
    extractedEmploymentDesc: parsed.employmentDesc || "N/A",
  };

  // --- Personal info
  const parsedPersonal = {
    extractedName: parsed.name || firstLine.match(regex.fullName)?.[0] || "N/A",
    extractedEmail: parsed.email || text.match(regex.email) || "N/A",
    extractedPhone: parsed.phone || text.match(regex.phone) || "N/A",
    extractedDomicile:
      parsed.domicile || text.match(regex.domicile)?.[0] || "N/A",
    extractedSkills: parsed.skills || text.match(regex.skills)?.[0] || "N/A",
  };

  return {
    personalInfo: parsedPersonal,
    formalEducation: parsedFormal,
    informalEducation: parsedInformal,
    careerInfo: parsedCareer,
  };
}

module.exports = mapCV;
