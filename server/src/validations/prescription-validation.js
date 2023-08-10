const Joi = require('joi');

const createHowTo = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        contentType: Joi.string().valid('VIDEO', 'PDF', 'DOC').required(),
        videoLink: Joi.string().required(),
    }),
};

module.exports = {
    createHowTo,
};
