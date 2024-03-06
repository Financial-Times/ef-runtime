const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

http
  .createServer(function (request, response) {
    let filePath = "./dist";
    switch (request.url) {
      case "/":
        filePath += "/index.html";
        break;
      case "/js":
        filePath += "/main.js";
        break;
      case "/css":
        filePath += "/style.css";
        break;
      default:
        filePath += request.url;
        break;
    }

    let extname = path.extname(filePath);
    let contentType = "text/html";
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
      case ".wav":
        contentType = "audio/wav";
        break;
    }

    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          response.writeHead(404, { "Content-Type": contentType });
          response.end("404 NOT FOUND", "utf-8");
        } else {
          response.writeHead(500);
          response.end(
            "Sorry, check with the site admin for error: " +
              error.code +
              " ..\n"
          );
          response.end();
        }
      } else {
        response.writeHead(200, {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type"
        });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
