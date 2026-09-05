const express = require("express");
const auth = require("../middlewares/auth");
const { handleUpload } = require("../middlewares/upload.middleware");
const uploadController = require("../controllers/upload.controller");

const router = express.Router();

router.get("/", auth, uploadController.listUploads);
router.get("/count", auth, uploadController.countUploads);
router.post("/", auth, handleUpload, uploadController.createUpload);
router.put("/:filename", auth, handleUpload, uploadController.replaceUpload);
router.delete("/:filename", auth, uploadController.deleteUpload);

module.exports = router;
