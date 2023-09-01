const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers");

// get all users
router.route("/").get(userController.getAllUsers);
router.route("/:userId").get(userController.getUserById);
// router.route("/:userId").put(userController.updateUser);
// router.route("/:userId").delete(userController.deleteUser);




module.exports = router;