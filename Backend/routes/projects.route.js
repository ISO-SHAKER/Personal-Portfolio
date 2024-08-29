const express = require("express");

const createMulter = require("../middlewares/createMulter");
const upload = createMulter("uploads/projects");

const projectsController = require("../controllers/projects.controller");
const router = express.Router();

router
  .route("/")
  .get(projectsController.getProjects)
  .post(upload.single("imageSrc"), projectsController.addProject);

router
  .route("/:id")
  .get(projectsController.getProject)
  .patch(upload.single("imageSrc"), projectsController.updateProject)
  .delete(projectsController.deleteProject);

module.exports = router;
