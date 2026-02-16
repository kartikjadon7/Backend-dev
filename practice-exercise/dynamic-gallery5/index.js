const express = require("express");
const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/gallery", (req, res) => {
  const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
  res.render("gallery", { images });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
