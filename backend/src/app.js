// load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/connect");
const { apiVersionRoute } = require("./constants");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/map.routes");
const redisClient = require("./db/redis");
const {
  errorMiddleware,
  notFoundMiddleware,
} = require("./middlewares/error.middleware");

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
app.use(`${apiVersionRoute}/users`, userRoutes);
app.use(`${apiVersionRoute}/captains`, captainRoutes);
app.use(`${apiVersionRoute}/maps`, mapRoutes);

// error handling middlewares
app.use(notFoundMiddleware, errorMiddleware);

module.exports = app;
