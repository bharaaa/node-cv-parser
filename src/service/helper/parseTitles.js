const dictionary = require("../dictionary");
const { countWords, restoreTextByRows } = require("./utils");

function parseTitles(Resume, rows) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (countWords(row) > 5) continue;

    for (const [key, expressions] of Object.entries(dictionary.titles)) {
      for (const expression of expressions) {
        const titleRegex = new RegExp(expression, "i");
        if (titleRegex.test(row)) {
          const otherTitles =
            Object.values(dictionary.titles)
              .flat()
              .filter((e) => e !== expression)
              .join("|") || "{end}";

          const textToSearch = restoreTextByRows(i, rows);
          const blockRegex = new RegExp(
            `(?:${expression})((.*\n)+?)(?:${otherTitles}|{end})`,
            "i"
          );

          const match = blockRegex.exec(textToSearch);
          if (match) Resume.addKey(key, match[1]);
        }
      }
    }
  }
}

module.exports = parseTitles;
