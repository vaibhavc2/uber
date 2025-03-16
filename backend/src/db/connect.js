const mongoose = require("mongoose");
const ct = require("../constants");

function connectDb() {
  mongoose
    .connect(ct.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB");
      console.error(error);
    });
}

module.exports = connectDb;
