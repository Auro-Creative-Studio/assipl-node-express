const express = require("express");

const router = express.Router();

const seoController = require("../controllers/seo.controller");

router.post("/", seoController.createSeo);

router.get("/", seoController.getAllSeo);

router.get("/page/:page_type", seoController.getSeoByPageType);

router.get("/:id", seoController.getSeoById);

router.put("/:id", seoController.updateSeo);

router.delete("/:id", seoController.deleteSeo);

module.exports = router;