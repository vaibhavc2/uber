const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

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
    body("vehicle.color")
      .isLength({ min: 3, max: 20 })
      .withMessage("Color must be between 3 and 20 characters long"),
    body("vehicle.numPlate")
      .isLength({ min: 6, max: 10 })
      .withMessage("Number plate must be between 6 and 10 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be atleast 1 passenger"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage(
        "Vehicle type must be either 'car' or 'motorcycle' or 'auto'"
      ),
    body("vehicle.make")
      .isLength({ min: 1, max: 50 })
      .withMessage("Make must be between 1 and 50 characters long"),
    body("vehicle.model")
      .isLength({ min: 1, max: 50 })
      .withMessage("Model must be between 1 and 50 characters long"),
    body("vehicle.year")
      .isInt({ min: 2000, max: new Date().getFullYear() })
      .withMessage("Year must be between 2000 and current year"),
  ],
  captainController.registerCaptain
);

module.exports = router;
