function extractFormatPhoneNumber(text) {
  if (!text) return "";

  const match = text.match(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/);

  // Remove all non-digit characters
  let cleaned = match[0].replace(/\D/g, "");

  // Normalize to start with '62'
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (!cleaned.startsWith("62")) {
    cleaned = "62" + cleaned;
  }

  // Format: +62-8123456789
  return "+".concat(cleaned.slice(0, 2), "-", cleaned.slice(2));
}

module.exports = extractFormatPhoneNumber;
