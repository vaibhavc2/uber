const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/connect");
const userRoutes = require("./routes/user.routes");
const redisClient = require("./db/redis");
const { errorMiddleware, notFoundMiddleware } = require("./middlewares/error.middleware");

dotenv.config();
connectDb();
redisClient.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/v1/users", userRoutes);

// error handling middlewares
app.use(notFoundMiddleware, errorMiddleware);

module.exports = app;
