import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.post("/submit", (req, res) => {
  const post = { 
    id: Date.now(), 
    content: req.body.content
  };

  posts.unshift(post);
  res.redirect("/posts");
});

//delete route 
app.post("/delete/:id", (req, res) => {
 const id = Number(req.params.id);
 posts = posts.filter(post => post.id !== id);
 res.redirect("/posts")
});

//edit page

app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.redirect("/posts");
  }

  res.render("edit.ejs", {post});
});

app.post("/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const newContent = req.body.content;

  const post = posts.find(p => p.id === id);
  if (post) {
    post.content = newContent;
  }

  res.redirect("/posts")
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { writtenStuff: posts });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});