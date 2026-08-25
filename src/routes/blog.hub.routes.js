const express = require("express");
const blogHubController = require("../controllers/blog.hub.controller");

const router = express.Router();

router.post("/", blogHubController.createBlogHub);
router.get("/", blogHubController.getAllBlogHubs);
router.get("/:id", blogHubController.getBlogHubById);
router.put("/:id", blogHubController.updateBlogHub);
router.delete("/:id", blogHubController.deleteBlogHub);

module.exports = router;