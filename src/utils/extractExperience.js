const positionList = require("../service/helper/dictionary/position");
const companyList = require("../service/helper/dictionary/company");

const dateRangeRegex =
  /\b((?:\w+\s\d{4})|(?:\d{1,2}[\/-]\d{4}))\s?[–-]\s?((?:\w+\s\d{4})|(?:\d{1,2}[\/-]\d{4})|\(Expected\)|Present)\b/i;

function extractExperience(experienceParts) {
  if (!Array.isArray(experienceParts) || experienceParts.length === 0) {
    return [];
  }

  function normalizeCompanyName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/\b(pt|cv|tbk|persero|jakarta|bandung|indonesia)\b/g, "")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const entries = [];
  let currentEntry = null;
  let collectingDescription = false;

  for (let i = 0; i < experienceParts.length; i++) {
    const line = experienceParts[i];
    if (!line || typeof line !== "string") continue;

    const matchedPosition = positionList.find((pos) =>
      line.toLowerCase().includes(pos.toLowerCase())
    );
    const dateMatch = line.match(dateRangeRegex);
    const nextLine = experienceParts[i + 1] || "";

    const matchedCompany =
      companyList.find((com) =>
        normalizeCompanyName(line).includes(normalizeCompanyName(com))
      ) ||
      companyList.find((com) =>
        normalizeCompanyName(nextLine).includes(normalizeCompanyName(com))
      );

    // console.log({
    //   line,
    //   matchedPosition,
    //   matchedCompany,
    //   dateMatch,
    // });

    if ((matchedPosition && matchedCompany)) {
      if (currentEntry) entries.push(currentEntry);

      currentEntry = {
        lastPosition: matchedPosition || null,
        lastCompany: matchedCompany || null,
        workStartDate: dateMatch ? dateMatch[1] : null,
        workEndDate: dateMatch ? dateMatch[2] : null,
        description: "",
      };

      collectingDescription = true;
    } else if (currentEntry && collectingDescription) {
      currentEntry.description +=
        (currentEntry.description ? " " : "") + line.trim();
    }
  }

  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
}

module.exports = extractExperience;
