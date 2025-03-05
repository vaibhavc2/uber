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
    const user = userModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
