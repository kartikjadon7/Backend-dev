const express = require("express");
const app = express();

const PORT = 8000;

const users = [
  { id: 1, name: "Kartik" },
  { id: 2, name: "Rohit" },
  { id: 3, name: "Karan" },
  { id: 4, name: "Aman" }
];

app.get("/users", (req, res) => {
  const searchName = req.query.name;

  if (!searchName) {
    return res.json(users);
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchName.toLowerCase())
  );

  res.json(filteredUsers);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// http://localhost:8000/users?name=kar
