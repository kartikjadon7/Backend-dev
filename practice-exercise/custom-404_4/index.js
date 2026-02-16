const express = require("express");
const app = express();

const PORT = 8000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// http://localhost:8000/random
