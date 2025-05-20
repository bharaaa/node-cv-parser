// test.js
const axios = require("axios");

axios.post("http://localhost:3000/parse", {
  file: "https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf"
})
.then(res => console.log(res.data))
.catch(err => console.error(err.response?.data || err));