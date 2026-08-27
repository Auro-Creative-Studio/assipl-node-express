const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, productController.createProduct);

router.get("/", productController.getAllProducts);

router.get("/published", productController.getPublishedProducts);

router.get("/slug/:slug", productController.getProductBySlug);

router.get("/:id", productController.getProductById);

router.put("/reorder", auth, productController.reorderProducts);

router.put("/:id", auth, productController.updateProduct);

router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
