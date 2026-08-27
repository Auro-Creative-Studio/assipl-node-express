const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, homeController.createHome);

router.get("/", homeController.getAllHome);

router.get("/:id", homeController.getHomeById);

router.put("/:id", auth, homeController.updateHome);

router.delete("/:id", auth, homeController.deleteHome);

module.exports = router;
