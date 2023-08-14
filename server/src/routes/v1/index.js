const express = require("express");
const eventRoute = require("./event.route");
const authRoute = require("./auth.route");
const videoSdkRoute = require("./videosdk.route");

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
