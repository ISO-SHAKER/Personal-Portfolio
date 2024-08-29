const express = require("express");
const createMulter = require("../middlewares/createMulter");

const upload = createMulter("uploads/users");

const verifyToken = require("../middlewares/verifyToken");
const usersController = require("../controllers/users-controller");

const router = express.Router();

router.route("/").get(verifyToken, usersController.getAllUsers);

router.route("/login").post(usersController.login);

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

module.exports = router;
