const redis = require("redis");
const ct = require("../constants");

const client = redis
  .createClient({
    url: ct.env.REDIS_URL,
  })
  .on("error", (error) => {
    console.error(error);
  })
  .on("connect", () => {
    console.log("Connected to Redis");
  });

module.exports = client;
