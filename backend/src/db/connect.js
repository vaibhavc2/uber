const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB");
      console.error(error);
    });
}

module.exports = connectDb;
