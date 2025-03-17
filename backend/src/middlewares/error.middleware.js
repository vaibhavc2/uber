const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports.errorMiddleware = (error, req, res, next) => {
  console.error(error?.message || error);

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: "Token expired" });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.errors });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .json({ message: "Invalid data type", details: error.message });
  }

  if (error.code === 11000) {
    return res
      .status(409)
      .json({ message: "Duplicate key error", details: error.keyValue });
  }

  if (error.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.message });
  }

  if (error.name === "SyntaxError") {
    return res
      .status(400)
      .json({ message: "Syntax error", details: error.message });
  }

  res.status(500).json({ message: "Something went wrong" });
};

module.exports.notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
};
