const http = require("http");
const app = require("./app");
const ct = require("./constants");
const { initializeSocket } = require("./socket");

const server = http.createServer(app);

initializeSocket(server);

const port = ct.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
