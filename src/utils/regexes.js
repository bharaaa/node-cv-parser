const regexes = {
    regex: {
      fullName: /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/,
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      phone: /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/,
      domicile:
        /\b(?:Domisili|Alamat|Location)?[:\s\-]*([A-Z][a-z]+(?:\s[A-Z][a-z]+)*,\s*(?:DKI\s)?[A-Z][a-z]+(?:\s[A-Z][a-z]+)*|[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s\d{5}|\b(?:Jakarta|Bandung|Depok|Sidoarjo)\b)/g,
      skills: /(Hard Skills|Soft Skills|Software Skills):\s*([\w\s,]+)/gi,
      degree:
        /\b(Diploma|S1|S2|Sarjana|Magister|Bachelor|Master|D3|BCs|B\.Sc|BSc)\b/gi,
      institution:
        /\b(?:Universitas|Politeknik|Institut|Akademi|President University|Sekolah Tinggi)(?:\s+[A-Z][a-zA-Z]*){1,4}/g,
      fieldOfStudy:
        /(?:Jurusan|Field of Study|Major|Program Studi|BCs in|BSc in|Bachelor(?: of)?|Engineering|Lulusan)\s*[:\-]?\s*([A-Z][a-zA-Z &\-]{2,}(?:\s[A-Z][a-zA-Z &\-]{2,})*)/i,
      educationDates:
        /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Mei|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Januari|Februari|Maret|April|Juni|Juli|Agustus|September|Oktober|November|Desember)?\s?\d{4}\s*[-–]\s*(?:Present|Sekarang|Now|\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Mei|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Januari|Februari|Maret|April|Juni|Juli|Agustus|September|Oktober|November|Desember)?\s?\d{4})/gi,
      gpa: /\b(?:GPA Score|GPA|Grade Point Average|Cumulative GPA|IPK|Indeks Prestasi Kumulatif)\s*[:=\-]?\s*(\d\.\d{1,2})(?:\s*(?:\/|out of|dari)\s*(\d\.\d{1,2}))?/i,
      certificate: /(?:Sertifikat|Certificate)[^\n]*/gi,
      company: /(?:PT\s[A-Z][A-Za-z\s&]*)/g,
      position:
        /(?:(?:Staf|Magang|Intern|Software Developer|Bidan|Engineer|Programmer|IT Support|Full Stack Developer)[^\n]{0,100}?\|\s*)?(PT\s+[A-Z][\w&.() ]+|RS\s+[A-Z][\w&.() ]+|Klinik\s+[A-Z][\w&.() ]+|Universitas\s+[A-Z][\w&.() ]+|[A-Z][A-Za-z&.() ]{2,}(?=\s+(?:Bandung|Jakarta|Depok|Sidoarjo|Indonesia)))/g,
      employmentDates:
        /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Mei|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Januari|Februari|Maret|April|Juni|Juli|Agustus|September|Oktober|November|Desember)?\s?\d{4}\s*[-–]\s*(?:Present|Sekarang|Now|\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Mei|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Januari|Februari|Maret|April|Juni|Juli|Agustus|September|Oktober|November|Desember)?\s?\d{4})/gi,
      employmentType:
        /\b(Intern|Full[\s\-]?Time|Part[\s\-]?Time|Freelance|Kontrak)\b/gi,
      employmentDescription: /•\s+[^•\n]+(?:\n\s*•\s+[^•\n]+)*/g,
      informalEducationName:
        /\b(?:Bangkit|Bootcamp|Academy|Pelatihan|Training|Online Course|Skill Boost|Intensive Program|Certified\s+[A-Z][a-zA-Z\s]+)/gi,
      informalEducationOrg:
        /\b(?:Google|Tokopedia|Gojek|Traveloka|Dicoding|Coursera|RevoU|Binar|Udemy|Kampus Merdeka|Microsoft|AWS|LinkedIn Learning|Hacktiv8|Glints|Codecademy|edX)\b/g,
      informalEducationDates:
        /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Mei|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Januari|Februari|Maret|April|Juni|Juli|Agustus|September|Oktober|November|Desember)\s?\d{4}\s*[-–]\s*(?:Present|Now|Sekarang|\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Mei|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Januari|Februari|Maret|April|Juni|Juli|Agustus|September|Oktober|November|Desember)?\s?\d{4})/gi,
      informalEducationCertificate:
        /(?:Certificate|Sertifikat|Completed|Achieved|Issued by|Credly|Lulus)[^\n]{0,100}(?:https?:\/\/[^\s]+)?/gi,
    },
  };
  
  module.exports = { regexes };