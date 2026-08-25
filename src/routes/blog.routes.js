const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blog.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, blogController.createBlog);

router.get("/", blogController.getAllBlogs);

router.get("/published", blogController.getPublishedBlogs);

router.get("/slug/:slug", blogController.getBlogBySlug);

router.get("/:id", blogController.getBlogById);

router.put("/:id", auth, blogController.updateBlog);

router.delete("/:id", auth, blogController.deleteBlog);

module.exports = router;
