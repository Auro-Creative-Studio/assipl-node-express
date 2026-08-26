const express = require("express");

const router = express.Router();

const contactFormEntryController = require("../controllers/contact.form.entry.controller");

router.post("/", contactFormEntryController.createContactFormEntry);

router.get("/", contactFormEntryController.getAllContactFormEntries);

router.get("/:id", contactFormEntryController.getContactFormEntryById);

router.put("/:id", contactFormEntryController.updateContactFormEntry);

router.delete("/:id", contactFormEntryController.deleteContactFormEntry);

module.exports = router;
