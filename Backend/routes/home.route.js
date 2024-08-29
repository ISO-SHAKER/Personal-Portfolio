const express = require("express");
const router = express.Router();

const createMulter = require("../middlewares/createMulter");
const upload = createMulter("uploads/home");

const homeController = require("../controllers/home.controller");

router.route("/").get(homeController.getHomeData);

router
  .route("/:id")
  .patch(upload.single("imageSrc"), homeController.updateHomeData);

module.exports = router;
