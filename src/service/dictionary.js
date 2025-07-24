const cities = require("../service/helper/dictionary/cities");
const educations = require("../service/helper/dictionary/education");
const degrees = require("../service/helper/dictionary/degree");

const cityRegex = new RegExp(`\\b(${cities.join("|")})\\b`, "i");
const educationsRegex = new RegExp(`\\b(${educations.join("|")})\\b`, "i");
const degreeRegex = new RegExp(`\\b(${degrees.join("|")})\\b`, "i");

module.exports = {
  regular: {
    name: [], // extract using extractName utils
    email: [/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/],
    phone: [/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/],
    domicile: [cityRegex],
    educations: [educationsRegex],
    degree: [degreeRegex],
  },
  inline: {},
  titles: {
    education: ["education", "pendidikan"],
    experience: ["experience", "pekerjaan", "work history"],
  },
  profiles: [
    "linkedin.com",
    "github.com",
    [
      "stackoverflow.com",
      async (url, resume, watcher) => {
        watcher.inProgress++;
        watcher.inProgress--;
      },
    ],
  ],
};
