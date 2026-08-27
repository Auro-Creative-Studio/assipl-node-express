const express = require("express");

const router = express.Router();

const logoController = require("../controllers/about.logo.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, logoController.createLogo);

router.get("/about/:aboutId", logoController.getLogosByAbout);

router.get("/:id", logoController.getLogoById);

router.put("/:id", auth, logoController.updateLogo);

router.delete("/:id", auth, logoController.deleteLogo);

module.exports = router;
