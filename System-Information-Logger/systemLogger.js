const os = require("os");
const fs = require("fs");

function logSystemInfo() {

    const cpu = os.cpus()[0].model;
    const memory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    const freeMemory = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    const platform = os.platform();
    const time = new Date().toLocaleString();

    const data = `
Time: ${time}
CPU: ${cpu}
Total Memory: ${memory}
Free Memory: ${freeMemory}
Platform: ${platform}
-------------------------
`;

    fs.appendFileSync("systemInfo.txt", data);

    console.log("System info logged...");
}

setInterval(logSystemInfo, 5000);
