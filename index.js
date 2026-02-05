const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 8000;
const filePath = path.join(__dirname, "students.json");

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
}

function readStudents() {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeStudents(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.post("/students", (req, res) => {
    if (!req.body.name || !req.body.branch) {
        return res.status(400).send("Invalid data");
    }

    const students = readStudents();

    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name: req.body.name,
        branch: req.body.branch
    };

    students.push(newStudent);
    writeStudents(students);

    res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
    res.json(readStudents());
});

app.put("/students/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    const students = readStudents();
    const index = students.findIndex(s => s.id === userId);

    if (index === -1) {
        return res.status(404).send("Student not found");
    }

    if (!req.body.name && !req.body.branch) {
        return res.status(400).send("Nothing to update");
    }

    students[index].name = req.body.name ?? students[index].name;
    students[index].branch = req.body.branch ?? students[index].branch;

    writeStudents(students);
    res.json(students[index]);
});


app.delete("/students/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    const students = readStudents();
    const index = students.findIndex(s => s.id === userId);

    if (index === -1) {
        return res.status(404).send("Student not found");
    }

    const deletedStudent = students.splice(index, 1);

    writeStudents(students);
    res.json(deletedStudent[0]);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
