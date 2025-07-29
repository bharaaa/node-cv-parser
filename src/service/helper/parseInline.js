const dictionary = require("../dictionaryRule");

function parseInline(Resume, row) {
  for (const [key, expr] of Object.entries(dictionary.inline)) {
    const regex = new RegExp(expr + ":?[s]*(.*)", "i");
    const match = regex.exec(row);
    if (match) {
      Resume.addKey(key.toLowerCase(), match[1]);
    }
  }
}

module.exports = { parseInline };
