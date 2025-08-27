import { render } from "ejs";
import express from "express";

const app = express();
const port = 4000;

const titleList = [];
const articleList = [];
app.use(express.static("public"));

// Use the urlencoded middleware
app.use(express.urlencoded({ extended: true }));

//render the home page
app.get("/", (req, res, next) => {

  res.render("index.ejs", {
    titles: titleList,
    articles: articleList,
  });
});

// render the create post file
app.get("/create-post", (req, res, next) => {
  res.render("partials/createpost.ejs"); // Remove leading slash and use correct filename
});

app.post("/", (req, res, next) => {
  titleList.push(req.body.title);
  articleList.push(req.body.article);
  console.log(titleList);
  console.log(articleList);

  res.redirect("/");
});

// Run the server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
