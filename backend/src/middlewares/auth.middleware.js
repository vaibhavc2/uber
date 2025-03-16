const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const jwt = require("jsonwebtoken");
const redisClient = require("../db/redis");
const ct = require("../constants");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const blackListed = await redisClient.get(token);
    if (blackListed?.toLowerCase().replace(/\s+/g, "") === "loggedout") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, ct.env.JWT_SECRET);
    const user = await userModel.findById(decoded?._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const blackListed = await redisClient.get(token);
    if (blackListed?.toLowerCase().replace(/\s+/g, "") === "loggedout") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, ct.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded?._id);

    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.captain = captain;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
