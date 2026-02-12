const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let users = [];
let idCounter = 1;

// Home Route
app.get("/", (req, res) => {
    res.render("form", { users });
});

// Register Route (POST)
app.post("/students/register", (req, res) => {
    const { name, branch } = req.body;

    const newUser = {
        id: idCounter++,
        name,
        branch
    };

    users.push(newUser);

    // Data will show on /students/register
    res.render("form", { users });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
