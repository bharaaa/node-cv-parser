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
  getKey(...keys) {
    let combined = [];

    for (const key of keys) {
      const value = this.parts[key];
      if (Array.isArray(value)) {
        combined.push(...value);
      } else if (value !== undefined && value !== null) {
        combined.push(value);
      }
    }

    return combined.length > 0 ? combined : null;
  }
}

module.exports = Resume;
