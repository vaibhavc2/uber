const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userModel = require("../models/user.model");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength({ min: 3, max: 50 })
      .withMessage("First name must be between 3 and 50 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

module.exports = router;
