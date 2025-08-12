const cities = require("./helper/dictionary/cities");
const provinces = require("./helper/dictionary/province");
const educations = require("./helper/dictionary/education");
const degrees = require("./helper/dictionary/degree");
const fieldOfStudy = require("./helper/dictionary/fieldOfStudy");
const informalEdu = require("./helper/dictionary/informalEdu");
const positions = require("./helper/dictionary/position");

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
const positionRegex = new RegExp(`\\b(${positions.join("|")})\\b`, "i");

const gpaRegex = /\b(?:GPA|IPK)[:\s]*([0-4](?:\.\d{1,2})?)\b/i;

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
    gpa: [gpaRegex],
    lastPosition: [positionRegex],
    skills: [],
    skillLanguage: [],
    educationEntries: [],
    experienceEntries: [],
  },
  inline: {},
  titles: {
    educationParts: ["education", "pendidikan"],
    experienceParts: [
      "experience",
      "pekerjaan",
      "work history",
      "pengalaman kerja",
    ],
    organizationParts: ["organization", "organisasi", "riwayat organisasi"],
    skillsParts: ["skills", "keahlian", "certificates & skills"],
    skillLanguagesParts: ["bahasa", "language", "languages"],
    awardsParts: ["awards", "penghargaan"],
    // projects: ["project", "projects", "proyek"],
    certificateParts: ["certificate", "certificates", "sertifikat"],
    languageParts: ["languages"],
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
