const dictionary = require("../dictionaryRule");

function parseProfiles(line, resume) {
  for (let profile of dictionary.profiles) {
    let handler;
    if (Array.isArray(profile)) {
      [profile, handler] = profile;
    }

    const regex = new RegExp(
      `((https?:\\/\\/)?(www\\.)?${profile.replace(".", "\\.")}[\\w/\\.-]*)`,
      "i"
    );
    const match = regex.exec(line);
    if (match) {
      resume.addKey("profiles", match[0]);
      line = line.replace(match[0], "");

      if (handler && typeof handler === "function") {
        // Optionally handle async profile parsing
      }
    }
  }
  return line;
}

module.exports = { parseProfiles };
