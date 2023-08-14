const catchAsync = require("../utils/catchAsync");
const { videoSdkService } = require("../services");
const httpStatus = require("http-status");

const getToken = catchAsync(async (req, res) => {
  const token = await videoSdkService.getToken();

  res.status(httpStatus.OK).json({ message: "Success", data: token });
});

const createRoom = catchAsync(async (req, res) => {
  const meeting = await videoSdkService.createRoom(req.body);

  res.status(httpStatus.OK).json({ message: "Success", data: meeting });
});

const validateRoom = catchAsync(async (req, res) => {
  const roomId = req.params.roomId;
  const meeting = await videoSdkService.validateRoom({
    roomId,
  });

  res.status(httpStatus.OK).json({ message: "Success", data: meeting });
});

module.exports = {
  getToken,
  createRoom,
  validateRoom,
};
