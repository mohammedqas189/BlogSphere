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

// render the create post page
app.get("/create-post", (req, res, next) => {
  res.render("post/createpost.ejs"); // Remove leading slash and use correct filename
});

// render the update post page
app.get("/update-post/:title", (req, res, next) => {
  const title = req.params.title;
  const index = titleList.indexOf(title); 

  const tiltToUpdate = titleList[index];
  const articleToUpdate = articleList[index];

  res.render("post/updatepost.ejs", {
    title: tiltToUpdate,
    article: articleToUpdate,
    index: index,
  });
});

// POST submitted, either new one, or updated one 
app.post("/", (req, res, next) => {
  const index = req.body.index; // Hidden field from form

  if (index === undefined || index === "") {
    // CREATE new post
    titleList.push(req.body.title.trim());
    articleList.push(req.body.article);
  } else {
    // UPDATE existing post
    const i = parseInt(index);
    titleList[i] = req.body.title;
    articleList[i] = req.body.article;
  }

  res.redirect("/");
});

// view Blog
app.get("/view-blog/:title", (req, res, next) => {
  const title = req.params.title;
  const index = titleList.indexOf(title);
  if (index === -1) {
    return res.status(404).send("Post not found");
  }
  const titleToView = titleList[index];
  const articleToView = articleList[index];
  res.render("post/viewpost.ejs", {
    title: titleToView,
    article: articleToView
  });
});

// delete blog
app.post("/:index", (req, res, next) => {
  const index = parseInt(req.params.index);

  titleList.splice(index, 1);
  articleList.splice(index, 1);

  res.redirect("/");
});

// Run the server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
