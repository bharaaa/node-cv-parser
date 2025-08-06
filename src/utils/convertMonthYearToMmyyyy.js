function convertMonthYearToMMyyyy(dateStr) {
  if (!dateStr) return null;

  const monthMap = {
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

  const [monthRaw, year] = dateStr.toLowerCase().split(" ");
  if (!monthRaw || !year) return null;

  let month = monthMap[monthRaw];
  if (!month && monthRaw === "april") month = "04"; // shared word
  if (!month && monthRaw === "september") month = "09";
  if (!month && monthRaw === "november") month = "11";

  if (!month) return null;
  return `${month}${year}`;
}

module.exports = convertMonthYearToMMyyyy;
