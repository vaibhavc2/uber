const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./db/connect");
const userRoutes = require("./routes/user.routes");

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/v1/users", userRoutes);

module.exports = app;
