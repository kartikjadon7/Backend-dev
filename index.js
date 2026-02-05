console.log("FILE LOADED");

const express = require("express");

const app = express();
app.use(express.json()); 

const PORT = 8000;

const students = [
    { id: 1, name: "Alice", branch: "CSE" },
    { id: 2, name: "Bob", branch: "ECE" },
    { id: 3, name: "Charlie", branch: "MECH" },
];

app.get("/", (req, res) => {
   res.send("Welcome to Expressjs Backend!");
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/search", (req ,res) => {
    const branch = req.query.branch;

    if(!branch){
        return res.json(students);
    }

    const foundStudents = students.filter(
        s => s.branch === branch
    );

    res.json(foundStudents);
});

app.get("/students/:id", (req, res) => {
    const id = req.params.id;

    const arrayIndex = students.findIndex(
        s => s.id == id
    );

    if(arrayIndex < 0){
        return res.status(404).send("student not found");
    }

    res.json(students[arrayIndex]);
});

app.post("/students/register",(req,res)=>{
    const data = req.body;

    students.push(data);
    res.status(201).json(data);

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.post('/students', (req, res) => {
    const newStudent = req.body;

    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading student data');
        }

        let students = [];

        
        if (data) {
            students = JSON.parse(data);
        }

        students.push(newStudent);

        fs.writeFile('student.json', JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving student data');
            }
            res.status(201).send('Student added successfully');
        });
    });
});