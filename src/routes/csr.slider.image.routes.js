const express = require("express");

const router = express.Router();

const sliderImageController = require("../controllers/csr.slider.image.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, sliderImageController.createSliderImage);

router.get("/csr/:csrId", sliderImageController.getSliderImagesByCsr);

router.get("/:id", sliderImageController.getSliderImageById);

router.put("/:id", auth, sliderImageController.updateSliderImage);

router.delete("/:id", auth, sliderImageController.deleteSliderImage);

module.exports = router;
