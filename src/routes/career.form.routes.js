const express = require("express");

const router = express.Router();

const careerFormController = require("../controllers/career.form.controller");
const uploadController = require("../controllers/upload.controller");
const { handleUpload } = require("../middlewares/upload.middleware");

router.post("/resume", handleUpload, uploadController.createUpload);

router.post("/", careerFormController.createCareerForm);

router.get("/", careerFormController.getAllCareerForms);

router.get("/:id", careerFormController.getCareerFormById);

router.put("/:id", careerFormController.updateCareerForm);

router.delete("/:id", careerFormController.deleteCareerForm);

module.exports = router;
