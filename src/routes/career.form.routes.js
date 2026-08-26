const express = require("express");

const router = express.Router();

const careerFormController = require("../controllers/career.form.controller");

router.post("/", careerFormController.createCareerForm);

router.get("/", careerFormController.getAllCareerForms);

router.get("/:id", careerFormController.getCareerFormById);

router.put("/:id", careerFormController.updateCareerForm);

router.delete("/:id", careerFormController.deleteCareerForm);

module.exports = router;
