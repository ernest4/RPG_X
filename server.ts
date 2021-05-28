const path = require("path");
const http = require("http");
const url = require("url");
const fs = require("fs");
const { TickProvider } = require("./server/utils/TickProvider");
const uws = require("uWebSockets.js"); // TODO: move to using uws for max perf & efficiency !

const { notFound, render } = require("./server/response");
const { debugLog, log } = require("./server/debug");

// const assets = process.env.NODE_ENV == "production" ? "build" : "public";
const assets = "dist";
const publicPath = path.join(__dirname, assets);
const port = process.env.PORT || 3001;

// const frontEndRootFilePath = path.join(publicPath, "index.html");

let cache: any = {};

// TODO: might strip this out and just use express.js ??
const server = (req: any, res: any) => {
  const query = url.parse(req.url, false);

  if (query.pathname === "/") query.pathname = "index.html";
  debugLog(`requesting ${query.pathname}`);

  const fileLoc = path.join(publicPath, query.pathname);

  // TODOO: implement streaming rather than bulk sending of files https://stackabuse.com/node-http-servers-for-static-file-serving/
  // to create 'back pressure'. Serves files faster overall when clients are slow.

  // Check the cache first...
  if (cache[fileLoc] !== undefined) {
    debugLog(`returning cached ${fileLoc}`);
    return render({ data: cache[fileLoc], res });
  }

  // ...otherwise load the file, save to the cache and return
  fs.readFile(fileLoc, (err: any, data: any) => {
    if (err) return notFound(res);

    debugLog(`caching ${fileLoc}`);
    cache[fileLoc] = data;

    return render({ data: cache[fileLoc], res });
  });
};

const httpServer = http.createServer(server);

httpServer.listen(port, () => {
  log(`Server is up! port ${port}`);
  log(`Environment: ${process.env.NODE_ENV}`);
});

// TODO: set up web socket server

// TODO: testing. game loop will be executed by this.
const tickProvider = new TickProvider((deltaTime: number) => console.log(deltaTime));
tickProvider.start();
