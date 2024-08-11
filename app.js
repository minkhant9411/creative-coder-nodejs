const express = require("express");
let morgan = require("morgan");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

const Blog = require("./models/Blog");
const blogRoutes = require("./routes/BlogRoutes");
const app = express();
app.use(express.urlencoded({ extended: true }));

//db url
let mongoUrl =
  "mongodb+srv://minkhant9411:XuAMOfzJXdEvLkuZ@forlocal.r8wqmg1.mongodb.net/?retryWrites=true&w=majority&appName=forlocal";
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
      console.log("app is running on port 3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/default");

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/add-blog", async (req, res) => {
  let blog = new Blog({
    title: "blog title 3",
    intro: "blog intro 3",
    body: "blog body 3",
  });

  await blog.save();
  res.send("blog saved");
});

app.get("/", async (req, res) => {
  res.redirect("/blogs");
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

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});
