const axios = require("axios");
const captainModel = require("../models/captain.model");
const { googleMapsUri } = require("../constants");

const apiKey = process.env.GOOGLE_MAPS_API;

module.exports.getAddressCoordinate = async (address) => {
  const url = `${googleMapsUri}/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(response.data.message || "Unable to fetch coordinates");
    }
  } catch (error) {
    throw new Error(error?.message || error);
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const url = `${googleMapsUri}/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    throw new Error(error?.message || error);
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const url = `${googleMapsUri}/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    throw new Error(error?.message || error);
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  if (!ltd || !lng || !radius) {
    throw new Error("Missing required fields");
  }

  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          // radius in km
          $centerSphere: [[ltd, lng], radius / 6371],
        },
      },
    });

    return captains;
  } catch (error) {
    throw new Error(error?.message || error);
  }
};
