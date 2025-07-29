const dictionary = require("../dictionaryRule");

function parseProfiles(line, resume) {
  // for (let profile of dictionary.profiles) {
  //   let handler;
  //   if (Array.isArray(profile)) {
  //     [profile, handler] = profile;
  //   }

  //   const regex = new RegExp(
  //     `((https?:\\/\\/)?(www\\.)?${profile.replace(".", "\\.")}[\\w/\\.-]*)`,
  //     "i"
  //   );
  //   const match = regex.exec(line);
  //   if (match) {
  //     resume.addKey("profiles", match[0]);
  //     line = line.replace(match[0], "");

  //     if (handler && typeof handler === "function") {
  //     }
  //   }
  // }
  // return line;
  for (let profile of dictionary.profiles) {
    let handler;
    let profilePattern = profile;

    if (Array.isArray(profile)) {
      [profilePattern, handler] = profile;
    }

    const profileKey = profilePattern.split(".")[0];

    const regex = new RegExp(
      `((https?:\\/\\/)?(www\\.)?${profilePattern.replace(
        /\./g,
        "\\."
      )}[\\w\\-./?=&#%]*)`,
      "gi"
    );

    let match;
    while ((match = regex.exec(line)) !== null) {
      const url = match[0];

      // Prevent duplicates
      const existing = resume.parts.profiles?.[profileKey];
      if (Array.isArray(existing)) {
        if (!existing.includes(url)) existing.push(url);
      } else if (existing && existing !== url) {
        resume.parts.profiles[profileKey] = [existing, url];
      } else if (!existing) {
        if (!resume.parts.profiles) resume.parts.profiles = {};
        resume.parts.profiles[profileKey] = url;
      }

      // Optional: call handler (e.g., async parsing)
      if (handler && typeof handler === "function") {
        handler(url, resume, { inProgress: 0 });0
      }

      // Clean line after match
      line = line.replace(url, "");
    }
  }

  return line;
}

module.exports = { parseProfiles };
