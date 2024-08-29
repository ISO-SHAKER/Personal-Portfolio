const express = require("express");

const worksController = require("../controllers/works.controller");

const router = express.Router();

router.route("/").get(worksController.getWorks).post(worksController.addWork);

router
  .route("/:id")
  .get(worksController.getWork)
  .patch(worksController.updateWork)
  .delete(worksController.deleteWork);

module.exports = router;
