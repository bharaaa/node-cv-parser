/**
 * Count words in a string
 * @param {string} str
 * @returns {number}
 */
function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).length;
  }
  
  /**
   * Restore text from a specific row index to the end
   * @param {number} rowNum - The starting row index
   * @param {string[]} allRows - Array of all lines in resume
   * @returns {string}
   */
  function restoreTextByRows(rowNum, allRows) {
    if (!Array.isArray(allRows) || typeof rowNum !== 'number') return "";
  
    const restored = [];
    for (let i = rowNum; i < allRows.length; i++) {
      restored.push(allRows[i]);
    }
    return restored.join("\n");
  }
  
  /**
   * Clean array of strings (trim and remove empty lines)
   * @param {string[]} lines
   * @returns {string[]}
   */
  function cleanLines(lines) {
    if (!Array.isArray(lines)) return [];
    return lines.map(line => line.trim()).filter(Boolean);
  }
  
  module.exports = {
    countWords,
    restoreTextByRows,
    cleanLines
  };
  