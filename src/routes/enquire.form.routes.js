const express = require("express");

const router = express.Router();

const enquireFormController = require("../controllers/enquire.form.controller");

router.post("/", enquireFormController.createEnquireForm);

router.get("/", enquireFormController.getAllEnquireForms);

router.get("/:id", enquireFormController.getEnquireFormById);

router.put("/:id", enquireFormController.updateEnquireForm);

router.delete("/:id", enquireFormController.deleteEnquireForm);

module.exports = router;
