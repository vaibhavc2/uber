const mongoose = require("mongoose");
const { generateAuthToken, comparePassword, hashPassword } = require("../utils/schema.methods");


const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [50, "First name must be at most 50 characters long"],
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      minLength: [3, "Last name must be at least 3 characters long"],
      maxLength: [50, "Last name must be at most 50 characters long"],
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [254, "Email must be at most 254 characters long"],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    select: false,
  },
  socketId: {
    type: String,
    required: false,
  },
}, { timestamps: true });

userSchema.methods.generateAuthToken = generateAuthToken;
userSchema.methods.comparePassword = comparePassword;
userSchema.statics.hashPassword = hashPassword;

const User = mongoose.model("User", userSchema);

module.exports = User;
