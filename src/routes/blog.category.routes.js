const express = require("express");

const router = express.Router();

const blogCategoryController = require("../controllers/blog.category.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, blogCategoryController.createBlogCategory);

router.get("/", blogCategoryController.getAllBlogCategories);

router.get("/:id", blogCategoryController.getBlogCategoryById);

router.put("/:id", auth, blogCategoryController.updateBlogCategory);

router.delete("/:id", auth, blogCategoryController.deleteBlogCategory);

module.exports = router;
