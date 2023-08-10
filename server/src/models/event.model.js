const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        scheduledDate: {
            type: String,
            required: true,
        },
        scheduledTime: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
    }
);

/**
 * @typedef Event
 */
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
