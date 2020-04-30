exports.notFound = (res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write("404: File Not Found!");
  return res.end();
};
