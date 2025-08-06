class Resume {
  constructor() {
    this.parts = {};
  }

  addKey(key, value) {
    if (!value) return;
    if (Array.isArray(this.parts[key])) {
      this.parts[key].push(value);
    } else if (this.parts[key]) {
      this.parts[key] = [this.parts[key], value];
    } else {
      this.parts[key] = value;
    }
  }
}

module.exports = Resume;
