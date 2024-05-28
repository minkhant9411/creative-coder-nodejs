const express = require("express");
const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let blogs = [
    { title: "blog title 1", intro: "intro 1" },
    { title: "blog title 2", intro: "intro 2" },
    { title: "blog title 3", intro: "intro 3" },
  ];
  res.render("index", {
    blogs,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("app is running on http://localhost:3000");
});
