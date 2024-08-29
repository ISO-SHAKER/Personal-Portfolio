const express = require("express");

const educationsController = require("../controllers/educations.controller");

const router = express.Router();

router
  .route("/")
  .get(educationsController.getEducations)
  .post(educationsController.addEducation);

router
  .route("/:id")
  .get(educationsController.getEducation)
  .patch(educationsController.updateEducation)
  .delete(educationsController.deleteEducation);

module.exports = router;
