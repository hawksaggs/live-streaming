const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res) => {
  const { username: email, password } = req.body;
  const user = await userService.register({ email, password });

  res.status(httpStatus.OK).json({ message: "Success", data: user });
});

const login = catchAsync(async (req, res) => {
  const user = await userService.login(req.body);

  res.status(httpStatus.OK).json({ message: "Success", data: user });
});

module.exports = {
  register,
  login,
};
