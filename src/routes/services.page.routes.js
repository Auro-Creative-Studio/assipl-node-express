const express = require("express");

const router = express.Router();

const servicesPageController = require("../controllers/services.page.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, servicesPageController.createServicesPage);

router.get("/", servicesPageController.getAllServicesPages);

router.get("/:id", servicesPageController.getServicesPageById);

router.put("/:id", auth, servicesPageController.updateServicesPage);

router.delete("/:id", auth, servicesPageController.deleteServicesPage);

module.exports = router;
