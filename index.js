import { render } from "ejs";
import express from "express";

const app = express();
const port = 4000;
app.use(express.static("public"));

// Use the urlencoded middleware
app.use(express.urlencoded({ extended: true }));

//render the home page
app.get("/", (req, res, next) => {
  res.render("index.ejs");
});

// render the create post file
app.get("/create-post", (req, res, next) => {
  res.render("partials/createpost.ejs"); // Remove leading slash and use correct filename
});

app.post("/", (req, res, next) => {
  const article = req.body.article;
  const title = req.body.title; 
  console.log(title);
  console.log(article);
  res.render("index.ejs");
});

// Run the server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
