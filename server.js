const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  let url;
  switch (req.url) {
    case "/":
      url = "index.html";
      res.statusCode = 200;
      break;
    case "/contact":
      url = "contact.html";
      res.statusCode = 200;
      break;
    case "/contact-us":
      res.setHeader("Location", "/contact");
      res.statusCode = 301;
      break;
    case "/about":
      url = "about.html";
      res.statusCode = 200;
      break;
    default:
      url = "404.html";
      res.statusCode = 404;
      break;
  }
  res.setHeader("Content-Type", "text/html");
  fs.readFile(`./views/${url}`, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});
server.listen(3000, "localhost", () => {
  console.log("server listening on http://localhost:3000");
});
