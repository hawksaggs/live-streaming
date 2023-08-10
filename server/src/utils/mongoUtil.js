const _ = require('lodash');
const mongoose = require('mongoose');

const convertToObjectId = (id) => {
    return new mongoose.Types.ObjectId(id);
};

/**
 * Convert string to ObjectId
 * @param {[string]} ids
 */
const convertStringIdsToObjectIds = (ids) => {
    return _.map(ids, function (id) {
        return new mongoose.Types.ObjectId(id);
    });
};

const convertObjectIdsToStringIds = (ids) => {
    return _.map(ids, function (id) {
        return id.toString();
    });
};

module.exports = {
    convertToObjectId,
    convertStringIdsToObjectIds,
    convertObjectIdsToStringIds,
};
