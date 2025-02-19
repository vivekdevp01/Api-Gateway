const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");
function checkPassword(plainPassword, encrpytedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encrpytedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
function createToken(input) {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
function verifyToken(token) {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  checkPassword,
  createToken,
  verifyToken,
};
