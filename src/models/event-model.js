const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        image: {
            type: [String],
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        scheduledDateTime: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        salePrice: {
            type: Number,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

/**
 * @typedef Event
 */
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
