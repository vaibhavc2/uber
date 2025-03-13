const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
