const express = require("express");
const multer = require("multer");

const auth = require("../../middlewares/auth");
const { eventController } = require("../../controllers");
// const { createArtefact, upsertMultiple } = require('../../validations/artefact.validation');
const validate = require("../../middlewares/validate");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

const router = express.Router();

// router.route('/').post(auth, validate(createArtefact), prescriptionController.createArtefact);
router.route("/").post(upload.single("file"), eventController.createEvent);
router.route("/").get(eventController.getAll);
router.route("/public").get(eventController.getpublicEvents);
router.route("/:eventId").get(eventController.getEvent);
router
  .route("/:eventId")
  .put(upload.single("file"), eventController.updateEvent);
router.route("/:eventId").delete(eventController.deleteEvent);
router.route("/like/:eventId").post(eventController.likeEvent);

module.exports = router;
