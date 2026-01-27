const fs= require("fs");

const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");

const readStream = fs.createReadStream(inputFilePath , { encoding: "utf-8"});

readStream.on("data", (chunk) => {
    console.log("Received chunk:", chunk);
    
})
readStream.on("end", () => {
    console.log("No more data to read.");
})

readStream.on("error", (err) => {
    console.error("Error reading the file:", err.message);
})