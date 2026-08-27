const express = require("express");

const router = express.Router();

const singleServiceController = require("../controllers/single.service.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, singleServiceController.createSingleService);

router.get("/", singleServiceController.getAllSingleServices);

router.get("/slug/:slug", singleServiceController.getSingleServiceBySlug);

router.get("/:id", singleServiceController.getSingleServiceById);

router.put("/reorder", auth, singleServiceController.reorderSingleServices);

router.put("/:id", auth, singleServiceController.updateSingleService);

router.delete("/:id", auth, singleServiceController.deleteSingleService);

module.exports = router;
