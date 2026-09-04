const express = require("express");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload.middleware");
const uploadController = require("../controllers/upload.controller");

const router = express.Router();

const handleUpload = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message || "File upload failed.",
            });
        }

        next();
    });
};

// router.get("/", auth, uploadController.listUploads);
// router.get("/count", auth, uploadController.countUploads);
router.post("/", handleUpload, uploadController.createUpload);
// router.put("/:filename", auth, handleUpload, uploadController.replaceUpload);
// router.delete("/:filename", auth, uploadController.deleteUpload);

module.exports = router;
