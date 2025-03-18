const rideModel = require("../models/ride.model");
const { getOtp } = require("../utils/otp");
const mapService = require("./map.service");

module.exports.getFare = async ({ pickup, destination }) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  try {
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
      auto: 30,
      car: 50,
      moto: 20,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };

    const fare = {
      auto: Math.round(
        baseFare.auto +
          (distanceTime.distance.value / 1000) * perKmRate.auto +
          (distanceTime.duration.value / 60) * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKmRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car
      ),
      moto: Math.round(
        baseFare.moto +
          (distanceTime.distance.value / 1000) * perKmRate.moto +
          (distanceTime.duration.value / 60) * perMinuteRate.moto
      ),
    };

    return fare;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  try {
    const fare = await getFare(pickup, destination);

    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      otp: getOtp(6),
      fare: fare[vehicleType],
    });

    return ride;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  try {
    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "accepted",
        captain: captain._id,
      }
    );

    const ride = await rideModel
      .findOne({
        _id: rideId,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    return ride;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.startRide = async ({ rideId, otp }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  try {
    const ride = await rideModel
      .findOne({
        _id: rideId,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.status !== "accepted") {
      throw new Error("Ride not accepted");
    }

    if (ride.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "ongoing",
      }
    );

    return ride;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  try {
    const ride = await rideModel
      .findOne({
        _id: rideId,
        captain: captain._id,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.status !== "ongoing") {
      throw new Error("Ride not ongoing");
    }

    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "completed",
      }
    );

    return ride;
  } catch (error) {
    throw new Error(error);
  }
};
