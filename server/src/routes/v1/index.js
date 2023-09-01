const express = require("express");
const eventRoute = require("./event.route");
const authRoute = require("./auth.route");
const videoSdkRoute = require("./videosdk.route");
const userRoute = require("./user.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/event",
    route: eventRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/meeting",
    route: videoSdkRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
