const express = require("express");
const fs = require("fs").promises;

const app = express();
app.use(express.json());

// simple middleware 1
app.use((req, res, next) => {
  console.log("I am middleware 1");
  next();
});

// simple middleware 2
app.use((req, res, next) => {
  console.log("I am middleware 2");
  next();
});

// auth middleware (token check)
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // demo validation
  if (token !== "mysecrettoken") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  console.log("Token verified");
  next();1
};

// logger middleware (write to file)
const loggerFile = async (req, res, next) => {
  const log = `Request at: ${new Date().toLocaleString()} | Method: ${req.method} | URL: ${req.url}\n`;

  try {
    await fs.appendFile("log.txt", log);
    console.log("log written");
  } catch (err) {
    console.log("file error:", err);
  }

  next();
};

// route
app.get("/students", authMiddleware, loggerFile, (req, res) => {
  res.status(200).json({ msg: "students route hit" });
});

// server
const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});