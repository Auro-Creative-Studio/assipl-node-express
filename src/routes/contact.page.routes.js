const express = require("express");

const router = express.Router();

const contactPageController = require("../controllers/contact.page.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, contactPageController.createContactPage);

router.get("/", contactPageController.getAllContactPage);

router.get("/latest", contactPageController.getLatestContactPage);

router.get("/:id", contactPageController.getContactPageById);

router.put("/:id", auth, contactPageController.updateContactPage);

router.delete("/:id", auth, contactPageController.deleteContactPage);

module.exports = router;
