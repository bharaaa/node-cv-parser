const dictionary = require("../dictionaryRule");
const { countWords, restoreTextByRows } = require("./utils");

function parseTitles(Resume, rows) {
  const text = restoreTextByRows(0, rows);
  const foundSections = new Set();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (countWords(row) > 5) continue;

    for (const [key, expressions] of Object.entries(dictionary.titles)) {
      for (const expression of expressions) {
        const titleRegex = new RegExp(`^\\s*${expression}\\s*$`, "i");
        if (titleRegex.test(row) && !foundSections.has(key)) {
          foundSections.add(key);

          // Find end marker
          const otherTitles =
            Object.entries(dictionary.titles)
              .filter(([k]) => k !== key)
              .flatMap(([, v]) => v)
              .join("|") || "{end}";

          const textToSearch = restoreTextByRows(i, rows);
          const blockRegex = new RegExp(
            `(?:${expression})([\\s\\S]*?)(?=(?:${otherTitles})|$)`,
            "i"
          );

          const match = blockRegex.exec(textToSearch);
          if (match) {
            const sectionContent = match[1]
              .trim()
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0);

            // Save as array (not as a single block)
            Resume.addKey(key, sectionContent);
          }
        }
      }
    }
  }
}

module.exports = { parseTitles };
