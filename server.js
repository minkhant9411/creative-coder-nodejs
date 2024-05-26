const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>hello world</h1>");
  fs.readFile();
  res.end();
});
server.listen(3000, "localhost", () => {
  console.log("server listening on http://localhost:3000");
});
