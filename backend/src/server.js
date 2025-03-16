const http = require("http");
const app = require("./app");
const ct = require("./constants");

const port = ct.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
