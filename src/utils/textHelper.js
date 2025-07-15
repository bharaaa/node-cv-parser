// Clean and normalize text lines
function cleanLines(text) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
  
  // Remove duplicate and stop words
  function removeStopWords(lines, stopWords = []) {
    return lines.map((text) => {
      const words = text.trim().split(/\s+/);
      const deduped = words.filter((w, i, arr) => w !== arr[i - 1]);
      return deduped
        .filter((word) =>
          stopWords.every((stop) => stop.toLowerCase() !== word.toLowerCase())
        )
        .join(" ");
    });
  }
  
  // Clean institution names
  function cleanInstitutionName(rawMatches) {
    if (!rawMatches) return ["N/A"];
    return rawMatches.map((name) => {
      const words = name.trim().split(/\s+/);
      const deduped = words.filter((w, i, arr) => w !== arr[i - 1]);
      const stopWords = ["Lulus", "cum", "laude", "IPK", "BCs"];
      const cleaned = deduped.filter((word) => !stopWords.includes(word));
      return cleaned.join(" ");
    });
  }
  
  module.exports = {
    cleanLines,
    removeStopWords,
    cleanInstitutionName,
  };
  