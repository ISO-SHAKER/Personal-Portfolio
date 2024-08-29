const express = require("express");
const router = express.Router();

const createMulter = require("../middlewares/createMulter");
const upload = createMulter("uploads/about");

const aboutController = require("../controllers/about.controller");

router.route("/").get(aboutController.getAboutData);
router
  .route("/:id")
  .patch(upload.single("imageSrc"), aboutController.updateAboutData);

module.exports = router;
