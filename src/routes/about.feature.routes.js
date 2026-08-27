const express = require("express");

const router = express.Router();

const featureController = require("../controllers/about.feature.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, featureController.createFeature);

router.get("/about/:aboutId", featureController.getFeaturesByAbout);

router.get("/:id", featureController.getFeatureById);

router.put("/:id", auth, featureController.updateFeature);

router.delete("/:id", auth, featureController.deleteFeature);

module.exports = router;
