const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

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
