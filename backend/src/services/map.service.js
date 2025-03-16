const axios = require("axios");
const captainModel = require("../models/captain.model");
const { hereMapsUri } = require("../constants");

const apiKey = process.env.HERE_MAPS_API;

module.exports.getAddressCoordinate = async (address) => {
  const url = `${hereMapsUri}/geocode?q=${encodeURIComponent(
    address
  )}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.items && response.data.items.length > 0) {
      const location = response.data.items[0].position;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    throw new Error(error?.message || error);
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const url = `${hereMapsUri}/routes?transportMode=car&origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0].sections[0];
      return {
        distance: route.summary.length,
        duration: route.summary.duration,
      };
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

  const url = `${hereMapsUri}/autosuggest?q=${encodeURIComponent(
    input
  )}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.items) {
      return response.data.items
        .map((item) => item.title)
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
