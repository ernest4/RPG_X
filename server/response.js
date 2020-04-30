exports.notFound = (res) => {
  res.writeHead(404, "Not Found");
  res.write("404: File Not Found!");
  return res.end();
};

exports.render = ({ status, data, res }) => {
  res.statusCode = status || 200;
  res.write(data);
  return res.end();
};
