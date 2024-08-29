const express = require("express");

const servicesController = require("../controllers/services.controller");

const router = express.Router();

router
  .route("/")
  .get(servicesController.getServices)
  .post(servicesController.addService);

router
  .route("/:id")
  .get(servicesController.getService)
  .patch(servicesController.updateService)
  .delete(servicesController.deleteService);

module.exports = router;
