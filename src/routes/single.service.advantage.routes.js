const express = require("express");

const router = express.Router();

const advantageController = require("../controllers/single.service.advantage.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, advantageController.createAdvantage);

router.get("/service/:serviceId", advantageController.getAdvantagesByService);

router.get("/:id", advantageController.getAdvantageById);

router.put("/:id", auth, advantageController.updateAdvantage);

router.delete("/:id", auth, advantageController.deleteAdvantage);

module.exports = router;
