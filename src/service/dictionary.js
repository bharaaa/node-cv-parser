module.exports = {
    regular: {
      name: [/Name:\s*(.+)/i],
      email: [/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/]
    },
    inline: {
      phone: /Phone|Telp|Mobile/i
    },
    titles: {
      education: ["education", "pendidikan"],
      experience: ["experience", "pekerjaan", "work history"]
    },
    profiles: [
      "linkedin.com",
      "github.com",
      ["stackoverflow.com", async (url, resume, watcher) => {
        watcher.inProgress++;
        watcher.inProgress--;
      }]
    ]
  };
  