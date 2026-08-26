const express = require("express");

const router = express.Router();

const serviceModelController = require("../controllers/service.model.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, serviceModelController.createServiceModel);

router.get("/service/:serviceId", serviceModelController.getServiceModelsByService);

router.get("/:id", serviceModelController.getServiceModelById);

router.put("/:id", auth, serviceModelController.updateServiceModel);

router.delete("/:id", auth, serviceModelController.deleteServiceModel);

module.exports = router;
