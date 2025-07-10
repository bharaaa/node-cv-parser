/**
 * @typedef {Object} PersonalInfo
 * @property {string} extractedName
 * @property {string} extractedEmail
 * @property {string | string[]} extractedPhone
 * @property {string | string[]} extractedDomicile
 * @property {string} extractedSkills
 */

/**
 * @typedef {Object} FormalEducation
 * @property {string} extractedEducation
 * @property {string} extractedDegree
 * @property {string | string[]} extractedInstitutionName
 * @property {string} extractedFieldOfStudy
 * @property {string} extractedFormalStartDate
 * @property {string} extractedFormalEndDate
 * @property {string} extractedGrade
 * @property {string} extractedFormalCertificate
 */

/**
 * @typedef {Object} InformalEducation
 * @property {string} extractedInformalEduName
 * @property {string} extractedOrganizationName
 * @property {string} extractedInformalStartDate
 * @property {string} extractedInformalEndDate
 * @property {string} extractedInformalCertificate
 */

/**
 * @typedef {Object} CareerInfo
 * @property {string} extractedCompanyHistory
 * @property {string | string[]} extractedHistoryPosition
 * @property {string} extractedCompanyHistoryStartDate
 * @property {string} extractedCompanyHistoryEndDate
 * @property {string | string[]} extractedEmploymentType
 * @property {string} extractedEmploymentDesc
 */

/**
 * @typedef {Object} ParsedCVData
 * @property {PersonalInfo} personalInfo
 * @property {FormalEducation} formalEducation
 * @property {InformalEducation} informalEducation
 * @property {CareerInfo} careerInfo
 */