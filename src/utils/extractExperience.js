const positionList = require("../service/helper/dictionary/position");

const dateRangeRegex = /\b(\w+\s\d{4})\s?[–-]\s?(\w+\s\d{4}|\(Expected\))/i;

function extractExperience(positionParts) {
  const entries = [];
  let currentEntry = {};

  for (let i = 0; i < positionParts.length; i++) {
    const line = educationParts[i];

    // Check for university name
    const matchedPosition = positionList.find((pos) =>
      line.toLowerCase().includes(pos.toLowerCase())
    );
    if (matchedPosition) {
      // Push previous if filled
      if (Object.keys(currentEntry).length > 0) entries.push(currentEntry);
      currentEntry = { lastPosition: matchedPosition };
    }

    // Check for date range
    const dateMatch = line.match(dateRangeRegex);
    if (dateMatch) {
      currentEntry.startDate = dateMatch[1];
      currentEntry.endDate = dateMatch[2];
    }
  }

  // Push the last entry
  if (Object.keys(currentEntry).length > 0) entries.push(currentEntry);

  return entries;
}

module.exports = extractExperience;
