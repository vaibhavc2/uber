const mongoose = require("mongoose");
const { generateAuthToken, comparePassword, hashPassword } = require("../utils/schema.methods");

const captainSchema = new mongoose.Schema({
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
    trim: true,
    required: false,
  },
  status: {
    type: String,
    enum: ["available", "busy", "offline"],
    default: "offline",
  },
  vehicle: {
    color: {
      type: String,
      required: [true, "Vehicle 'color' is required"],
      trim: true,
      minLength: [3, "Color must be at least 3 characters long"],
      maxLength: [20, "Color must be at most 20 characters long"],
    },
    numPlate: {
      type: String,
      required: [true, "Vehicle 'number plate' is required"],
      trim: true,
      minLength: [6, "Number plate must be at least 6 characters long"],
      maxLength: [10, "Number plate must be at most 10 characters long"],
    },
    capacity: {
      type: Number,
      required: [true, "Vehicle 'capacity' is required"],
      min: [1, "Capacity must be at least 1 passengers"],
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: ["car", "motorcycle", "auto"],
    },
    model: {
      type: String,
      required: [true, "Vehicle 'model' is required"],
      trim: true,
      minLength: [3, "Model must be at least 3 characters long"],
      maxLength: [20, "Model must be at most 20 characters long"],
    },
    make: {
      type: String,
      required: [true, "Vehicle 'make' is required"],
      trim: true,
      minLength: [3, "Make must be at least 3 characters long"],
      maxLength: [20, "Make must be at most 20 characters long"],
    },
    year: {
      type: Number,
      required: [true, "Vehicle 'year' is required"],
      min: [2000, "Year must be at least 2000"],
      max: [new Date().getFullYear(), `Year must be at most ${new Date().getFullYear()}`],
    },
  },
  location: {
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
  }
}, { timestamps: true });

captainSchema.methods.generateAuthToken = generateAuthToken;
captainSchema.methods.comparePassword = comparePassword;
captainSchema.statics.hashPassword = hashPassword;

const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain;