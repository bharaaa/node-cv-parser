const extractNameFromHeader = require("../utils/extractNameFromHeader");

function extractName(rawText) {
  const headerName = extractNameFromHeader(rawText);
  if (headerName) return headerName;

  // fallback to regex if not found
  const match = rawText.match(
    /\b([A-Z][a-z]+(?:[-'][A-Z][a-z]+)?(?:\s[A-Z][a-z]+(?:[-'][A-Z][a-z]+)?){1,3})\b/g
  );
  return match ? match[0] : null;
}

module.exports = extractName;
