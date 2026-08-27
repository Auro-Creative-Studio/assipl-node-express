const express = require("express");

const router = express.Router();

const introImageController = require("../controllers/csr.intro.image.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, introImageController.createIntroImage);

router.get("/csr/:csrId", introImageController.getIntroImagesByCsr);

router.get("/:id", introImageController.getIntroImageById);

router.put("/:id", auth, introImageController.updateIntroImage);

router.delete("/:id", auth, introImageController.deleteIntroImage);

module.exports = router;
