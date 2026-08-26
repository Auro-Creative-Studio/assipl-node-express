const express = require("express");

const router = express.Router();

const careerPositionController = require("../controllers/career.position.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, careerPositionController.createCareerPosition);

router.get("/", careerPositionController.getAllCareerPositions);

router.get("/:id", careerPositionController.getCareerPositionById);

router.put("/:id", auth, careerPositionController.updateCareerPosition);

router.delete("/:id", auth, careerPositionController.deleteCareerPosition);

module.exports = router;
