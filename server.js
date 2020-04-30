const path = require("path");
const http = require("http");
const url = require("url");
const fs = require("fs");

const response = require("./server/response");

const assets = process.env.NODE_ENV == "production" ? "build" : "public";
const publicPath = path.join(__dirname, assets);
const port = process.env.PORT || 3001;

const frontEndRootFilePath = path.join(publicPath, "index.html");

let cache = {};

const server = (req, res) => {
  const query = url.parse(req.url, true);

  if (query.pathname !== "/") return response.notFound(res);

  const fileLoc = frontEndRootFilePath;

  // Check the cache first...
  if (cache[fileLoc] !== undefined) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(cache[fileLoc]);
    return res.end();
  }

  // ...otherwise load the file
  fs.readFile(fileLoc, function (err, data) {
    if (err) return response.notFound(res);

    // Save to the cache
    cache[fileLoc] = data;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
};

const httpServer = http.createServer(server);

httpServer.listen(port, () => {
  console.log(`Server is up! port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// TODO: set up web socket server
