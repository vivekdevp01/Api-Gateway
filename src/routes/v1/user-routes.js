const express = require("express");
const { UserController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");
const router = express.Router();

router.post(
  "/signup",
  UserMiddleware.validateCreateRequest,
  UserController.signUp
);
router.post(
  "/signin",
  UserMiddleware.validateCreateRequest,
  UserController.signIn
);
router.post(
  "/role",
  UserMiddleware.checkAuth,
  UserMiddleware.isAdmin,
  UserController.addRoleToUser
);

module.exports = router;
