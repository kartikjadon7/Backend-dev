const express = require("express");
const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(name, email, message);
  res.send("Form submitted successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// http://localhost:8000/contact