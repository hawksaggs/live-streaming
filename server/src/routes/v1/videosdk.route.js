const express = require("express");
const { videoSdkController } = require("../../controllers");

const router = express.Router();

router.route("/token").get(videoSdkController.getToken);
router.route("/").post(videoSdkController.createRoom);
router.route("/:roomId").get(videoSdkController.validateRoom);

module.exports = router;
