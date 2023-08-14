const httpStatus = require("http-status");
const { Event } = require("../models");
const ApiError = require("../utils/ApiError");
const { createRoom } = require("./videosdk.service");

const getAll = async () => {
  // add system defined fields
  return Event.find({});
};
const getEvent = async (eventId) => {
  // add system defined fields
  return Event.findOne({ _id: eventId });
};
const createEvent = async (eventBody) => {
  // add system defined fields
  const { roomId: meetingId } = await createRoom();
  eventBody.meetingId = meetingId;
  return Event.create(eventBody);
};
const updateEvent = async (eventId, eventBody) => {
  // add system defined fields
  return Event.updateOne({ _id: eventId }, eventBody);
};
const deleteEvent = async (eventId) => {
  // add system defined fields
  return Event.deleteOne({ _id: eventId });
};

module.exports = {
  getAll,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
