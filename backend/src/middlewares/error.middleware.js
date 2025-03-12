module.exports.errorMiddleware = (error, req, res, next) => {
  console.error(error.message || error);
  res.status(500).json({ message: "Something went wrong" });
}

module.exports.notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
}