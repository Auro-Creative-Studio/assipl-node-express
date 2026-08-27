const express = require("express");

const router = express.Router();

const maintenanceController = require("../controllers/services.maintenance.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, maintenanceController.createMaintenanceItem);

router.get("/page/:servicePageId", maintenanceController.getMaintenanceItemsByPage);

router.get("/:id", maintenanceController.getMaintenanceItemById);

router.put("/:id", auth, maintenanceController.updateMaintenanceItem);

router.delete("/:id", auth, maintenanceController.deleteMaintenanceItem);

module.exports = router;
