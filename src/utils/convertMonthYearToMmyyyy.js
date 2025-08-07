function convertMonthYearToMMyyyy(dateStr) {
  if (typeof dateStr !== "string") return null;

  const monthMap = {
    // Shortened english
    jan: "01",
    feb: "02",
    mar: "03",
    apr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    aug: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dec: "12",
    // Shortened indo
    agu: "08",
    okt: "10",
    des: "12",
    // Indonesian
    januari: "01",
    februari: "02",
    maret: "03",
    april: "04",
    mei: "05",
    juni: "06",
    juli: "07",
    agustus: "08",
    september: "09",
    oktober: "10",
    november: "11",
    desember: "12",
    // English
    january: "01",
    february: "02",
    march: "03",
    april_en: "04", // handled below
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september_en: "09",
    october: "10",
    november_en: "11",
    december: "12",
  };

  // Normalize
  const lower = dateStr.toLowerCase().trim();

  // ✅ Handle MM/YYYY or M/YYYY
  const slashMatch = lower.match(/^(\d{1,2})[\/\-](\d{4})$/);
  if (slashMatch) {
    let [_, monthStr, yearStr] = slashMatch;
    if (!/^\d{4}$/.test(yearStr)) return null;

    // Pad single-digit month with 0
    if (monthStr.length === 1) monthStr = "0" + monthStr;

    return `${monthStr}${yearStr}`;
  }

  // Split by comma (optional), only use first part
  const [monthYearPart] = lower.split(",");

  // Split into words (assume "month year")
  const parts = monthYearPart.trim().split(" ");
  if (parts.length !== 2) return null;

  const [monthName, year] = parts;
  const month = monthMap[monthName];
  if (!month || !/^\d{4}$/.test(year)) return null;

  return `${month}${year}`;

  // const normalize = (input) => input.toLowerCase().trim();

  // const parseSingle = (part) => {
  //   if (!part || typeof part !== "string") return null;

  //   const lower = part.toLowerCase().trim();

  //   // Handle MM/YYYY or M/YYYY
  //   const slashMatch = lower.match(/^(\d{1,2})[\/\-](\d{4})$/);
  //   if (slashMatch) {
  //     let [_, m, y] = slashMatch;
  //     if (!/^\d{4}$/.test(y)) return null;
  //     return (m.length === 1 ? "0" + m : m) + y;
  //   }

  //   // Handle "Month YYYY"
  //   const words = lower.split(" ");
  //   if (words.length !== 2) return null;

  //   const [monthName, year] = words;
  //   const month = monthMap[monthName];
  //   if (!month || !/^\d{4}$/.test(year)) return null;

  //   return `${month}${year}`;
  // };

  // const parts = dateStr.split(/\s?[–—-]\s?/); // Split on any dash type
  // const startRaw = parts[0];
  // const endRaw = parts[1];

  // const start = parseSingle(startRaw);
  // const endNormalized = normalize(endRaw || "");

  // const isOngoing = ["present", "sekarang", "(expected)"].includes(
  //   endNormalized
  // );
  // const end = isOngoing ? null : parseSingle(endRaw);

  // return { start, end };
}

module.exports = convertMonthYearToMMyyyy;
