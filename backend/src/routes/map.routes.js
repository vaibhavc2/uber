const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const mapController = require("../controllers/map.controller");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("pickup").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  mapController.getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  mapController.getAutoCompleteSuggestions
);

module.exports = router;
