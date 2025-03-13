const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  fullName,
  email,
  password,
  vehicle,
}) => {
  const { firstName, lastName } = fullName;
  const { vehicleType, color, make, year, model, numPlate, capacity } = vehicle;

  if (
    !firstName ||
    !email ||
    !password ||
    !vehicleType ||
    !color ||
    !make ||
    !year ||
    !model ||
    !numPlate ||
    !capacity
  ) {
    throw new Error("Missing required fields");
  }

  try {
    const captain = await captainModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        vehicleType,
        color,
        make,
        year,
        model,
        numPlate,
        capacity,
      },
    });

    return captain;
  } catch (error) {
    throw new Error(error?.message);
  }
};

module.exports.findCaptainByEmail = async (email) => {
  if (!email) {
    throw new Error("Missing required fields");
  }

  try {
    const captain = await captainModel.findOne({ email }).select("+password");

    return captain;
  } catch (error) {
    throw new Error(error.message);
  }
};
