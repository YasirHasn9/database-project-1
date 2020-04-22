const server = require("./api/server.js");

const PORT = process.env.PORT || 5000;

server.use((err, req, res, next) => {
  console.error(err);

  res
    .status(500)
    .json({ message: "There was an error performing the required operation" });
});

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
