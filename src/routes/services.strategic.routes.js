const express = require("express");

const router = express.Router();

const strategicController = require("../controllers/services.strategic.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, strategicController.createStrategicItem);

router.get("/page/:servicePageId", strategicController.getStrategicItemsByPage);

router.get("/:id", strategicController.getStrategicItemById);

router.put("/:id", auth, strategicController.updateStrategicItem);

router.delete("/:id", auth, strategicController.deleteStrategicItem);

module.exports = router;
