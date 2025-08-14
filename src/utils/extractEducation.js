const universityList = require("../service/helper/dictionary/education");
const fieldOfStudyList = require("../service/helper/dictionary/fieldOfStudy");
const degreeList = require("../service/helper/dictionary/degree");

const gpaRegex = /\b(?:GPA|IPK)[:\s]*([0-4](?:\.\d{1,2})?)\b/i;
const dateRangeRegex =
  /\b((?:\w+\s\d{4})|(?:\d{1,2}[\/-]\d{4}))\s?[–-]\s?((?:\w+\s\d{4})|(?:\d{1,2}[\/-]\d{4})|\(Expected\))/i;

function extractEducation(educationParts) {
  const entries = [];

  let currentEntry = {
    fieldOfStudy: undefined,
    description: undefined,
    degree: undefined,
    grade: undefined,
    institution: undefined,
    eduStartDate: null,
    eduEndDate: null,
  };

  for (let i = 0; i < educationParts.length; i++) {
    const line = educationParts[i].trim();

    // Check for university name
    const matchedUniversity = universityList.find((uni) =>
      line.toLowerCase().includes(uni.toLowerCase())
    );
    if (matchedUniversity) {
      // If currentEntry already has values, push and reset
      if (
        currentEntry.institution ||
        currentEntry.fieldOfStudy ||
        currentEntry.eduStartDate ||
        currentEntry.grade
      ) {
        entries.push(currentEntry);
        currentEntry = {
          fieldOfStudy: undefined,
          description: undefined,
          degree: undefined,
          grade: undefined,
          institution: undefined,
          eduStartDate: null,
          eduEndDate: null,
        };
      }
      currentEntry.institution = matchedUniversity;
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

    const matchedDegree = degreeList.find(
      (deg) =>
        line.toLowerCase().includes(deg.id.toLowerCase()) ||
        line.toLowerCase().includes(deg.en.toLowerCase())
    );
    if (matchedDegree) {
      currentEntry.degree = matchedDegree.en;
    }

    // Check for GPA
    const gpaMatch = line.match(gpaRegex);
    if (gpaMatch) {
      currentEntry.grade = gpaMatch[1];
    }

    // Check for date range
    const dateMatch = line.match(dateRangeRegex);
    if (dateMatch) {
      currentEntry.eduStartDate = dateMatch[1];
      currentEntry.eduEndDate = dateMatch[2];
    }

    // console.log({
    //   line,
    //   matchedUniversity,
    //   matchedField,
    //   gpaMatch,
    //   dateMatch,
    // });
  }

  // Push the last entry if it has data
  if (
    currentEntry.institution ||
    currentEntry.fieldOfStudy ||
    currentEntry.eduStartDate ||
    currentEntry.grade ||
    currentEntry.degree
  ) {
    entries.push(currentEntry);
  }

  return entries;
}

module.exports = extractEducation;
