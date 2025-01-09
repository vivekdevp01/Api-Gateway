const express = require("express");

const { InfoController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");
const userRoutes = require("./user-routes");
const router = express.Router();

router.get("/info", UserMiddleware.checkAuth, InfoController.info);
router.use("/user", userRoutes);

module.exports = router;
