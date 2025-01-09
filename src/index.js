const express = require("express");
const rateLimit = require("express-rate-limit");
const { ServerConfig } = require("./config");
const { createProxyMiddleware } = require("http-proxy-middleware");
const apiRoutes = require("./routes");
// const { Auth } = require("./utils/common");
const app = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(
  "/flightService",
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE_ADDRESS,
    changeOrigin: true,
    // pathRewrite: { "^/flightService": "/" },
  })
);
app.use(
  "/bookingService",
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE_ADDRESS.replace(/\/$/, ""),
    changeOrigin: true,
    // pathRewrite: { "^/bookingService": "/" },
  })
);
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});

/**
 * user
 * |
 * v
 * localhost:4003/bookingService(Api gateway) localhost:4002/api/v1/bookings
 * |
 * V
 * localhost:4001/api/v1/flights
 */
