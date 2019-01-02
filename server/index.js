require("dotenv").config();
const server = require("./api");

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
