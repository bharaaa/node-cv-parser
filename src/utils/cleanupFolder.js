const fs = require("fs");
const path = require("path");

/**
 * Keeps the latest N files in a folder and deletes the rest.
 * @param {string} folderPath - Absolute path to the folder
 * @param {number} keepCount - Number of latest files to keep
 */
const cleanupFolder = (folderPath, keepCount) => {
  if (!fs.existsSync(folderPath)) return;

  const files = fs
    .readdirSync(folderPath)
    .map((file) => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      return { file, time: stats.mtimeMs };
    })
    .sort((a, b) => b.time - a.time); // Newest first

  const filesToDelete = files.slice(keepCount);

  filesToDelete.forEach(({ file }) => {
    const filePath = path.join(folderPath, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${filePath}`);
  });
};

module.exports = cleanupFolder;
