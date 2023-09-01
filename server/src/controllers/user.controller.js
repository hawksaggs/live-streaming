const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUser();
  res.status(httpStatus.OK).json({ users });
});

const getUserById = catchAsync(async (req, res) => {
  const users = await userService.getUserById(req.params.userId);
  res.status(httpStatus.OK).json({ users });
});

module.exports = {
  getAllUsers,
  getUserById,
};