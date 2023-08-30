const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { eventService } = require("../services");

const getpublicEvents = catchAsync(async (req, res) => {
  const events = await eventService.getpublicEvents();

  res.status(httpStatus.OK).send({ message: "Success", data: events });
});

const getAll = catchAsync(async (req, res) => {
  const user = req?.user;
  const events = await eventService.getAll(user);

  res.status(httpStatus.OK).send({ message: "Success", data: events });
});

const getEvent = catchAsync(async (req, res) => {
  const user = req?.user;
  const event = await eventService.getEvent(user, req.params.eventId);

  res.status(httpStatus.OK).send({ message: "Success", data: event });
});

const createEvent = catchAsync(async (req, res) => {
  const user = req?.user;
  const event = await eventService.createEvent(user, {
    ...req.body,
    image: req.file.filename,
  });
  res.status(httpStatus.CREATED).send({ message: "Success", data: event });
});

const updateEvent = catchAsync(async (req, res) => {
  const body = req.body;
  delete body.image;
  if (req.file) {
    body.image = req.file.filename;
  }
  const user = req?.user;
  const event = await eventService.updateEvent(user, req.params.eventId, body);
  res.status(httpStatus.OK).send({ message: "Success", data: event });
});

const deleteEvent = catchAsync(async (req, res) => {
  const user = req?.user;

  await eventService.deleteEvent(user, req.params.eventId);

  res.status(httpStatus.OK).send({ message: "Success" });
});

const likeEvent = catchAsync(async (req, res) => {
  const user = req?.user;

  await eventService.likeEvent(user, req.params.eventId);

  res.status(httpStatus.OK).send({ message: "Success" });
});

module.exports = {
  getAll,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getpublicEvents,
  likeEvent,
};
