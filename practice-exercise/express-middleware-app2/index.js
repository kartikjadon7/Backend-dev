const express = require("express");
const app = express();

const PORT = 8000;

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const time = Date.now() - start;
    console.log(`${req.method} ${req.url} ${time}ms`);
  });

  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//  http://localhost:8000
