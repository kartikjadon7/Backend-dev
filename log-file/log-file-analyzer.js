const fs = require("fs");
const readline = require("readline");

const logFile = "app.log";

let totalLines = 0;
let infoCount = 0;
let warningCount = 0;
let errorCount = 0;

const readStream = fs.createReadStream(logFile, { encoding: "utf8" });

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) {
    errorCount++;
  } else if (line.includes("WARNING")) {
    warningCount++;
  } else if (line.includes("INFO")) {
    infoCount++;
  }
});

rl.on("close", () => {
  console.log("\n===== Log File Analysis Report =====");
  console.log("Total Log Entries:", totalLines);
  console.log("INFO Count:", infoCount);
  console.log("WARNING Count:", warningCount);
  console.log("ERROR Count:", errorCount);

  const errorRate =
    totalLines > 0 ? ((errorCount / totalLines) * 100).toFixed(2) : 0;

  console.log("Error Rate:", errorRate + "%");
});
