const express = require("express");

const router = express.Router();

const aboutController = require("../controllers/about.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, aboutController.createAbout);

router.get("/", aboutController.getAllAbout);

router.get("/:id", aboutController.getAboutById);

router.put("/:id", auth, aboutController.updateAbout);

router.delete("/:id", auth, aboutController.deleteAbout);

module.exports = router;
