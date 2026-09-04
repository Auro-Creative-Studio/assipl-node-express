const axios = require("axios");
const FormData = require("form-data");

const CPANEL_UPLOAD_URL = process.env.CPANEL_UPLOAD_URL;
const CPANEL_UPLOAD_SECRET = process.env.CPANEL_UPLOAD_SECRET;

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

        if (
            req.file.mimetype === "application/pdf" &&
            req.file.size > RESUME_MAX_SIZE
        ) {
            return res.status(400).json({
                success: false,
                message: "Resume file must not exceed 5MB.",
            });
        }

        const form = new FormData();

        form.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            knownLength: req.file.size,
        });

        const response = await axios.post(
            CPANEL_UPLOAD_URL,
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    "X-Upload-Secret": CPANEL_UPLOAD_SECRET,
                },
                maxContentLength: 25 * 1024 * 1024,
                maxBodyLength: 25 * 1024 * 1024,
            }
        );

        if (!response.data?.success) {
            return res.status(500).json({
                success: false,
                message: response.data?.message || "File storage failed.",
            });
        }

        const uploadedFile = response.data;

        const extension =
            "." +
            uploadedFile.filename
                .split(".")
                .pop()
                .toLowerCase();

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
        console.error(
            "Upload error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to upload file.",
            error:
                error.response?.data?.message ||
                error.message,
        });
    }
};

module.exports = {
    createUpload,
};