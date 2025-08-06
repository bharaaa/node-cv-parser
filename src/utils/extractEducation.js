const universityList = require("../service/helper/dictionary/education");
const fieldOfStudyList = require("../service/helper/dictionary/fieldOfStudy");

const gpaRegex = /\b(?:GPA|IPK)[:\s]*([0-4](?:\.\d{1,2})?)\b/i;
const dateRangeRegex = /\b(\w+\s\d{4})\s?[–-]\s?(\w+\s\d{4}|\(Expected\))/i;

function extractEducation(educationParts) {
  const entries = [];
  let currentEntry = {};

  for (let i = 0; i < educationParts.length; i++) {
    const line = educationParts[i];

    // Check for university name
    const matchedUniversity = universityList.find((uni) =>
      line.toLowerCase().includes(uni.toLowerCase())
    );
    if (matchedUniversity) {
      // Push previous if filled
      if (Object.keys(currentEntry).length > 0) entries.push(currentEntry);
      currentEntry = { institution: matchedUniversity };
    }

    // Check for field of study
    const matchedField = fieldOfStudyList.find(
      (field) =>
        line.toLowerCase().includes(field.id.toLowerCase()) ||
        line.toLowerCase().includes(field.en.toLowerCase())
    );
    if (matchedField) {
      currentEntry.fieldOfStudy = matchedField.en;
    }

    // Check for GPA
    const gpaMatch = line.match(gpaRegex);
    if (gpaMatch) {
      currentEntry.gpa = gpaMatch[1];
    }

    // Check for date range
    const dateMatch = line.match(dateRangeRegex);
    if (dateMatch) {
      currentEntry.startDate = dateMatch[1];
      currentEntry.endDate = dateMatch[2];
    }
  }

  // Push the last entry
  if (Object.keys(currentEntry).length > 0) entries.push(currentEntry);

  return entries;
}

module.exports = extractEducation;
