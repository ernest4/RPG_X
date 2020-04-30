exports.notFound = (res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write("404: File Not Found!");
  return res.end();
};

// const CONTENT_TYPE = {
//   json: { "Content-Type": "application/json" },
//   html: { "Content-Type": "text/html" },
// };

exports.render = ({ status, json, html, res }) => {
  res.writeHead(status || 200, { "Content-Type": "text/html" });
  res.write(html);
  return res.end();
};
