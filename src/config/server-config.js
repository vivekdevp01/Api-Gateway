const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT_ROUND: process.env.SALT_ROUND,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET: process.env.JWT_SECRET,
  FLIGHT_SERVICE_ADDRESS: process.env.FLIGHT_SERVICE_ADDRESS,
  BOOKING_SERVICE_ADDRESS: process.env.BOOKING_SERVICE_ADDRESS,
};
