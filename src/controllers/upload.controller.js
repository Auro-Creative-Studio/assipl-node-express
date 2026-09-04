const path = require("path");
const { uploadToCpanel } = require("../utils/ftp");

const RESUME_MAX_SIZE = 5 * 1024 * 1024;

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
const VIDEO_EXTENSIONS = [".mp4", ".webm"];

const getFileType = (extension) => {
    if (IMAGE_EXTENSIONS.includes(extension)) return "image";
    if (VIDEO_EXTENSIONS.includes(extension)) return "video";

    return "file";
};

const createUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file was uploaded.",
            });
        }

        // Resume/PDF maximum size = 5MB
        if (
            req.file.mimetype === "application/pdf" &&
            req.file.size > RESUME_MAX_SIZE
        ) {
            return res.status(400).json({
                success: false,
                message: "Resume file must not exceed 5MB.",
            });
        }

        // Upload file to cPanel via FTP
        const uploadedFile = await uploadToCpanel(req.file);

        const extension = path.extname(uploadedFile.filename).toLowerCase();

        const fileInfo = {
            filename: uploadedFile.filename,
            original_name: uploadedFile.original_name,
            type: getFileType(extension),
            extension,
            size: uploadedFile.size,
            url: uploadedFile.url || null,
        };

        return res.status(201).json({
            success: true,
            data: fileInfo,
        });

    } catch (error) {
        console.error("Upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload file.",
            error: error.message,
        });
    }
};

module.exports = {
    createUpload,
};