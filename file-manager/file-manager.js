const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\n===== File Manager =====");
  console.log("1. Read File");
  console.log("2. Write File");
  console.log("3. Copy File");
  console.log("4. Delete File");
  console.log("5. List Directory");
  console.log("6. Exit");

  rl.question("Enter your choice: ", handleChoice);
}

function handleChoice(choice) {
  switch (choice) {
    case "1":
      readFile();
      break;
    case "2":
      writeFile();
      break;
    case "3":
      copyFile();
      break;
    case "4":
      deleteFile();
      break;
    case "5":
      listDirectory();
      break;
    case "6":
      console.log("Exiting File Manager. Bye 👋");
      rl.close();
      break;
    default:
      console.log("Invalid choice!");
      showMenu();
  }
}

function readFile() {
  rl.question("Enter file name: ", (file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log("File not found!");
      } else {
        console.log("\n--- File Content ---");
        console.log(data);
      }
      showMenu();
    });
  });
}

function writeFile() {
  rl.question("Enter file name: ", (file) => {
    rl.question("Enter content: ", (content) => {
      fs.writeFile(file, content, (err) => {
        if (err) {
          console.log("Error writing file!");
        } else {
          console.log("File written successfully.");
        }
        showMenu();
      });
    });
  });
}

function copyFile() {
  rl.question("Enter source file: ", (src) => {
    rl.question("Enter destination file: ", (dest) => {
      fs.copyFile(src, dest, (err) => {
        if (err) {
          console.log("Error copying file!");
        } else {
          console.log("File copied successfully.");
        }
        showMenu();
      });
    });
  });
}

function deleteFile() {
  rl.question("Enter file name to delete: ", (file) => {
    fs.unlink(file, (err) => {
      if (err) {
        console.log("File not found!");
      } else {
        console.log("File deleted successfully.");
      }
      showMenu();
    });
  });
}

function listDirectory() {
  rl.question("Enter directory path (press Enter for current): ", (dir) => {
    const directory = dir === "" ? "." : dir;
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.log("Directory not found!");
      } else {
        console.log("\n--- Directory Contents ---");
        files.forEach(file => console.log(file));
      }
      showMenu();
    });
  });
}

showMenu();
