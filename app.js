const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const Blog = require("./models/Blog");
const mongoUrl =
  "mongodb+srv://minkhant9411:XuAMOfzJXdEvLkuZ@forlocal.r8wqmg1.mongodb.net/?retryWrites=true&w=majority&appName=forlocal";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to db!");
    app.listen(3000, () => {
      console.log("app is running on http://localhost:3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout/default");

// app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("index", {
    blogs,
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.get("/blogs/create", (req, res) => {
  res.render("blogs/create", {
    title: "Blog Create",
  });
});
app.get("/add-blog", (req, res) => {
  let blog = new Blog({
    title: "blog title 2",
    intro: "blog intro 2",
    body: "blog body 2",
  });
  blog.save();
  res.redirect("/");
});
app.get("/single-blog", async (req, res) => {
  let blog = await Blog.findById("66b5b7ded7d03d64ca8b92ba");
  res.json(blog);
});
app.use((req, res) => {
  res.status(404).render("404");
});
