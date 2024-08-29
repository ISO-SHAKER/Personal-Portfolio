const express = require("express");

const createMulter = require("../middlewares/createMulter");
const upload = createMulter("uploads/skills");

const skillsController = require("../controllers/skills.controller");

const router = express.Router();

router
  .route("/")
  .get(skillsController.getSkills)
  .post(skillsController.addSkill);

router
  .route("/:id")
  .get(skillsController.getSkill)
  .patch(skillsController.updateSkill)
  .delete(skillsController.deleteSkill);

router
  .route("/:id/skillsList")
  .post(upload.single("image"), skillsController.addSkillItem);

router
  .route("/:id/skillsList/:itemId")
  .get(skillsController.getSkillItem)
  .patch(upload.single("image"), skillsController.updateSkillItem)
  .delete(skillsController.deleteSkillItem);

module.exports = router;
