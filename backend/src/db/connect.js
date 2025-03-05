const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.log("Error connecting to the database");
      console.error(error);
    });
}

module.exports = connectDb;
