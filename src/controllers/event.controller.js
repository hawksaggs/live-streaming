const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {eventService} = require("../services");

const getEvent = catchAsync(async (req, res) => {
    const event = await eventService.getEvent(req.params.eventId);

    res.status(httpStatus.OK).send({message: "Success", data: event});
});

const createEvent = catchAsync(async (req, res) => {
    const event = await eventService.createEvent(req.body);
    res.status(httpStatus.CREATED).send({message: "Success", data: event});
});

const updateEvent = catchAsync(async (req, res) => {
    const event = await eventService.updateEvent(req.params.eventId, req.body);
    res.status(httpStatus.OK).send({message: "Success", data: event});
});

const deleteEvent = catchAsync(async (req, res) => {
    await eventService.deleteEvent(req.params.eventId);
    res.status(httpStatus.OK).send({message: "Success"});
});

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};
