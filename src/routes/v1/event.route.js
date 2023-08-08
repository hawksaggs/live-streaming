const express = require('express');
const auth = require('../../middlewares/auth');
const {eventController} = require('../../controllers');
// const { createArtefact, upsertMultiple } = require('../../validations/artefact.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

// router.route('/').post(auth, validate(createArtefact), prescriptionController.createArtefact);
router.route('/').post(eventController.createEvent);
router.route('/:eventId').get(eventController.getEvent);
router.route('/:eventId').put(eventController.updateEvent);
router.route('/:eventId').delete(eventController.deleteEvent);

module.exports = router;
