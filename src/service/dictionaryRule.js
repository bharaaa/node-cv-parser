const cities = require("./helper/dictionary/cities");
const provinces = require("./helper/dictionary/province");
const educations = require("./helper/dictionary/education");
const degrees = require("./helper/dictionary/degree");
const fieldOfStudy = require("./helper/dictionary/fieldOfStudy");
const informalEdu = require("./helper/dictionary/informalEdu");

const emailRegex = new RegExp(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/);
const cityRegex = new RegExp(`\\b(${cities.join("|")})\\b`, "i");
const provinceRegex = new RegExp(`\\b(${provinces.join("|")})\\b`, "i");
const educationsRegex = new RegExp(`\\b(${educations.join("|")})\\b`, "i");
const degreeRegex = new RegExp(`\\b(${degrees.join("|")})\\b`, "i");
const fieldOfStudyKeywords = fieldOfStudy.map((entry) =>
  entry.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
); // escape regex
const fieldOfStudyRegex = new RegExp(
  `\\b(${fieldOfStudyKeywords.join("|")})\\b`,
  "i"
);
const informalEduKeywords = informalEdu.map((entry) =>
  entry.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
); // escape regex
const informalEduRegex = new RegExp(
  `\\b(${informalEduKeywords.join("|")})\\b`,
  "i"
);

module.exports = {
  regular: {
    name: [], // extract using extractName utils
    email: [emailRegex],
    phone: [], // extract using extractPhone utils
    domicile: [cityRegex],
    province: [provinceRegex],
    educations: [educationsRegex],
    fieldOfStudy: [fieldOfStudyRegex],
    degree: [degreeRegex],
    informalEdu: [informalEduRegex],
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
