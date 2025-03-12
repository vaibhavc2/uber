const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
}).on("error", (error) => {
  console.error(error);
}).on("connect", () => {
  console.log("Connected to Redis");
});

module.exports = client;
