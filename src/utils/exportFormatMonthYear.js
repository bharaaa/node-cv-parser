// helper function
function exportFormatMonthYear(input, format = "slash") {
  if (!input || input.length !== 6) return input; // return original if invalid

  const month = parseInt(input.substring(0, 2), 10); // "09" → 9
  const year = parseInt(input.substring(2), 10); // "2023" → 2023

  // Default day = 1
  const dateObj = new Date(year, month - 1, 1);

  if (format === "slash") {
    // e.g. 9/1/2023 or 10/1/2023
    return `${month}/${dateObj.getDate()}/${year}`;
  } else if (format === "dash") {
    // e.g. 01-09-23 or 01-10-23
    const mm = month.toString().padStart(2, "0");
    const dd = dateObj.getDate().toString().padStart(2, "0");
    const yy = year.toString().slice(-2);
    return `${dd}-${mm}-${yy}`;
  }

  return input;
}

module.exports = exportFormatMonthYear;
