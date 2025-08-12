const skillLanguagesList = require("../service/helper/dictionary/skillLanguages");

function extractSkillLanguagesFromText(text) {
  if (!text) return [];

  const lines = Array.isArray(text) ? text : [text]; // Ensure array form
  const foundSkills = new Set();

  for (const rawLine of lines) {
    const line = rawLine.trim().toLowerCase();

    for (const lang of skillLanguagesList) {
      if (
        line.includes(lang.id.toLowerCase()) ||
        line.includes(lang.en.toLowerCase())
      ) {
        foundSkills.add(lang.en); // add English name only
      }
    }
  }

  return Array.from(foundSkills);
}

module.exports = extractSkillLanguagesFromText;
