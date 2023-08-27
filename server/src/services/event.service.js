const httpStatus = require("http-status");
const { Event } = require("../models");
const ApiError = require("../utils/ApiError");
const { createRoom } = require("./videosdk.service");

const getAll = async (actor) => {
  // add system defined fields
  return Event.find({ user: actor.id });
};
const getEvent = async (actor, eventId) => {
  // add system defined fields
  return Event.findOne({ _id: eventId, user: actor.id });
};
const createEvent = async (actor, eventBody) => {
  // add system defined fields
  const { roomId: meetingId } = await createRoom();
  eventBody.meetingId = meetingId;
  eventBody.user = actor.id;
  return Event.create(eventBody);
};
const updateEvent = async (actor, eventId, eventBody) => {
  // get event
  const dbEvent = await module.exports.getEvent(actor, eventId);
  if (!dbEvent) throw new Error("Event not found");
  // add system defined fields
  return Event.updateOne({ _id: eventId }, eventBody);
};
const deleteEvent = async (actor, eventId) => {
  // add system defined fields
  return Event.deleteOne({ _id: eventId, user: actor.id });
};

module.exports = {
  getAll,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
