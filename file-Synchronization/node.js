const fs = require("fs");
const path = require("path");

function syncDirectories(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const srcFiles = fs.readdirSync(src);

    srcFiles.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      const srcStat = fs.statSync(srcPath);

      if (srcStat.isDirectory()) {
        syncDirectories(srcPath, destPath);
      } else {
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log("Copied:", file);
        } else {
          const destStat = fs.statSync(destPath);
          if (srcStat.mtime > destStat.mtime) {
            fs.copyFileSync(srcPath, destPath);
            console.log("Updated:", file);
          }
        }
      }
    });
  } catch (error) {
    console.log("Error:", error.message);
  }
}

const sourceDir = "./source";
const targetDir = "./target";

syncDirectories(sourceDir, targetDir);
