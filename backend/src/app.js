const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/connect");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const redisClient = require("./db/redis");
const { errorMiddleware, notFoundMiddleware } = require("./middlewares/error.middleware");

// load environment variables
dotenv.config();

// connect to MongoDB and Redis
connectDb();
redisClient.connect();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/captains", captainRoutes);

// error handling middlewares
app.use(notFoundMiddleware, errorMiddleware);

module.exports = app;
