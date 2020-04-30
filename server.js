const path = require("path");
const express = require("express"); // TODO: pull out express dependanyc and use raw http!!
const app = express();

const assets = process.env.NODE_ENV == "production" ? "build" : "public";
const publicPath = path.join(__dirname, assets);
const port = process.env.PORT || 3001;

// TODO: pull this out and use raw http!!
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up! port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// TODO: set up web socket server
