const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const redisClient = require("../db/redis");
const { convertTime } = require("../utils/time");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const captainAlreadyExists = await captainService.findCaptainByEmail(email);
  if (captainAlreadyExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  try {
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
      fullName,
      email,
      password: hashedPassword,
      vehicle,
    });

    const token = captain.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      captain: {
        ...captain._doc,
        password: undefined,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await captainService.findCaptainByEmail(email);
    if (!captain) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await captain.comparePassword(
      password,
      captain.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      captain: {
        ...captain._doc,
        password: undefined,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      captain: {
        ...req.captain._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await redisClient.set(token, "logged out", {
      EX: convertTime(process.env.JWT_EXPIRE, "s"),
    });
  } catch (error) {
    next(error);
  }

  res.clearCookie("token");

  res.status(200).json({ message: "Logged out" });
};
