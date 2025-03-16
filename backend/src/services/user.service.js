const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !email || !password) {
    throw new Error("Missing required fields");
  }
  try {
    const user = await userModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    });

    return user;
  } catch (error) {
    throw new Error(error?.message || error);
  }
};

module.exports.findUserByEmail = async (email) => {
  if (!email) {
    throw new Error("Missing required fields");
  }
  try {
    const user = await userModel.findOne({ email }).select("+password");

    return user;
  } catch (error) {
    throw new Error(error?.message || error);
  }
};
