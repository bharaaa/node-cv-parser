const cities = require("./helper/dictionary/cities");
const educations = require("./helper/dictionary/education");
const degrees = require("./helper/dictionary/degree");
const fieldOfStudy = require("./helper/dictionary/fieldOfStudy");

const cityRegex = new RegExp(`\\b(${cities.join("|")})\\b`, "i");
const educationsRegex = new RegExp(`\\b(${educations.join("|")})\\b`, "i");
const degreeRegex = new RegExp(`\\b(${degrees.join("|")})\\b`, "i");
const fieldOfStudyKeywords = fieldOfStudy.map((entry) =>
  entry.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
); // escape regex
const fieldOfStudyRegex = new RegExp(
  `\\b(${fieldOfStudyKeywords.join("|")})\\b`,
  "i"
);

module.exports = {
  regular: {
    name: [], // extract using extractName utils
    email: [/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/],
    phone: [], // extract using extractPhone utils
    domicile: [cityRegex],
    educations: [educationsRegex],
    fieldOfStudy: [fieldOfStudyRegex],
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
