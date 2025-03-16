const ct = {
  apiVersionRoute: "/api/v1",
  googleMapsUri: "https://maps.googleapis.com/maps/api",
  env: {
    GOOGLE_MAPS_API: String(process.env.GOOGLE_MAPS_API),
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_EXPIRE: String(process.env.JWT_EXPIRE),
    NODE_ENV: String(process.env.NODE_ENV),
    PORT: Number(process.env.PORT),
    MONGO_URI: String(process.env.MONGO_URI),
    REDIS_URI: String(process.env.REDIS_URI),
  }
};

module.exports = ct;
