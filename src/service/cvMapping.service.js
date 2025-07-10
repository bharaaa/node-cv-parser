const {} = require("../types/cv.types");

/**
 * Maps raw parsed data into structured fields.
 * @param {Object} parsedData
 * @returns {ParsedCVData}
 */
function mapParsedData(parsedData) {
    return {
      personalInfo: {
        extractedName: parsedData.name || "",
        extractedEmail: parsedData.email || "",
        extractedPhone: parsedData.phone || "",
        extractedDomicile: parsedData.domicile || "",
        extractedSkills: parsedData.skills || "",
      },
      formalEducation: {
        extractedEducation: parsedData.education || "",
        extractedDegree: parsedData.degree || "",
        extractedInstitutionName: parsedData.institution || "",
        extractedFieldOfStudy: parsedData.fieldOfStudy || "",
        extractedFormalStartDate: parsedData.formalStartDate || "",
        extractedFormalEndDate: parsedData.formalEndDate || "",
        extractedGrade: parsedData.grade || "",
        extractedFormalCertificate: parsedData.formalCertificate || "",
      },
      informalEducation: {
        extractedInformalEduName: parsedData.informalEduName || "",
        extractedOrganizationName: parsedData.organization || "",
        extractedInformalStartDate: parsedData.informalStartDate || "",
        extractedInformalEndDate: parsedData.informalEndDate || "",
        extractedInformalCertificate: parsedData.informalCertificate || "",
      },
      careerInfo: {
        extractedCompanyHistory: parsedData.company || "",
        extractedHistoryPosition: parsedData.position || "",
        extractedCompanyHistoryStartDate: parsedData.startDate || "",
        extractedCompanyHistoryEndDate: parsedData.endDate || "",
        extractedEmploymentType: parsedData.employmentType || "",
        extractedEmploymentDesc: parsedData.description || "",
      },
    };
  }
  
  module.exports = mapParsedData;