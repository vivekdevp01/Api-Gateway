const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { Auth } = require("../utils/common");
const userRepository = new UserRepository();

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    console.log(error);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function signIn(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No user found for the given error",
        StatusCodes.NOT_FOUND
      );
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Password does not matched", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({ id: user.id, emal: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error);
    throw new AppError(
      "Cannot sign in with the given credentials",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("missing token", StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
    const user = await userRepository.get(response.id);
    if (!user) {
      throw new AppError("User not found", StatusCodes.UNAUTHORIZED);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token", StatusCodes.BAD_REQUEST);
    }
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token expired", StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw new AppError(
      "Cannot authenticate the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  signIn,
  isAuthenticated,
};

//In UserController.js
