const express = require("express");
const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let posts = [
  { id: 1, title: "First Post", content: "Hello this is my first blog" }
];

app.get("/posts", (req, res) => {
  res.render("posts", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };

  posts.push(newPost);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("post", { post });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//http://localhost:8000/posts
