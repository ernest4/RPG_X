const path = require("path");
const http = require("http");
const url = require("url");
const fs = require("fs");

const { notFound, render } = require("./server/response");
const { debugLog, log } = require("./server/debug");

const assets = process.env.NODE_ENV == "production" ? "build" : "public";
const publicPath = path.join(__dirname, assets);
const port = process.env.PORT || 3001;

const frontEndRootFilePath = path.join(publicPath, "index.html");

let cache = {};

const server = (req, res) => {
  const query = url.parse(req.url, false);

  if (query.pathname !== "/") return notFound(res);

  const fileLoc = frontEndRootFilePath;

  // Check the cache first...
  if (cache[fileLoc] !== undefined) {
    debugLog("returning cached");
    return render({ html: cache[fileLoc], res });
  }

  // ...otherwise load the file, save to the cache and return
  fs.readFile(fileLoc, (err, data) => {
    if (err) return notFound(res);

    debugLog("caching");
    cache[fileLoc] = data;

    return render({ html: cache[fileLoc], res });
  });
};

const httpServer = http.createServer(server);

httpServer.listen(port, () => {
  log(`Server is up! port ${port}`);
  log(`Environment: ${process.env.NODE_ENV}`);
});

// TODO: set up web socket server
