const dictionary = require("../dictionary");

function parseRegular(text, resume) {
  const regular = dictionary.regular;
  for (const key in regular) {
    for (const pattern of regular[key]) {
      const match = new RegExp(pattern, "i").exec(text);
      if (match) {
        resume.addKey(key, match[1] || match[0]);
      }
    }
  }
}

module.exports = { parseRegular };
