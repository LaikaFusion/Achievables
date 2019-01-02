require("dotenv").config();
const server = require("./api");

const port = process.env.PORT || 3333;

server.get("/", (req, res) => {
  res.send("Sanity check.");
});

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
