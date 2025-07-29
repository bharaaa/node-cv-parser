function extractNameFromHeader(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (
      !line.match(
        /(email|phone|address|linkedin|github|curriculum vitae|cv)/i
      ) &&
      !line.match(/[\d@]/)
    ) {
      return line;
    }
  }
  return null;
}

module.exports = extractNameFromHeader;
