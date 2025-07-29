const skillsList = require("../service/helper/dictionary/skills");

function extractSkillsFromText(text) {
  if (!text || typeof text !== "string") return [];

  const lowerText = text.toLowerCase();
  const foundSkills = new Set();

  skillsList.forEach((skill) => {
    const skillRegex = new RegExp(`\\b${skill.toLowerCase()}\\b`, "g");
    if (skillRegex.test(lowerText)) {
      foundSkills.add(skill);
    }
  });

  return Array.from(foundSkills);
}

module.exports = extractSkillsFromText;
