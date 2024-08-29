const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contact.controller");

router.route("/").get(contactController.getContactData);

router.route("/:id").patch(contactController.updateContactData);

module.exports = router;
