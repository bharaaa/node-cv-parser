class Resume {
    constructor() {
      this.parts = {};
    }
  
    addKey(key, value) {
      if (!this.parts[key]) {
        this.parts[key] = value;
      } else {
        // Merge if already exists
        this.parts[key] += "\n" + value;
      }
    }
  }
  
  module.exports = Resume;
  