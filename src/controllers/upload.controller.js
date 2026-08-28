const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "../../uploads");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
const VIDEO_EXTENSIONS = [".mp4", ".webm"];

const RESUME_MAX_SIZE = 5 * 1024 * 1024;

const exceedsResumeLimit = (file) => file.mimetype === "application/pdf" && file.size > RESUME_MAX_SIZE;

const getFileType = (extension) => {
    if (IMAGE_EXTENSIONS.includes(extension)) return "image";
    if (VIDEO_EXTENSIONS.includes(extension)) return "video";
    return "file";
};

const buildFileInfo = (filename) => {
    const filePath = path.join(uploadPath, filename);
    const stats = fs.statSync(filePath);
    const extension = path.extname(filename).toLowerCase();

    return {
        filename,
        original_name: filename,
        type: getFileType(extension),
        extension,
        size: stats.size,
        url: `uploads/${filename}`,
        updated_at: stats.mtime,
    };
};

const listUploads = (req, res) => {
    try {
        const filenames = fs
            .readdirSync(uploadPath)
            .filter((name) => fs.statSync(path.join(uploadPath, name)).isFile());

        const files = filenames
            .map(buildFileInfo)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        return res.json({ success: true, data: files });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to list media files.",
            error: error.message,
        });
    }
};

const countUploads = (req, res) => {
    try {
        const total = fs
            .readdirSync(uploadPath)
            .filter((name) => fs.statSync(path.join(uploadPath, name)).isFile()).length;

        return res.json({ success: true, data: { total } });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to count media files.",
            error: error.message,
        });
    }
};

const createUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file was uploaded." });
    }

    if (exceedsResumeLimit(req.file)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ success: false, message: "Resume file must not exceed 5MB." });
    }

    const fileInfo = buildFileInfo(req.file.filename);
    fileInfo.original_name = req.file.originalname;

    return res.status(201).json({ success: true, data: fileInfo });
};

const replaceUpload = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No replacement file was uploaded.",
            });
        }

        if (exceedsResumeLimit(req.file)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, message: "Resume file must not exceed 5MB." });
        }

        const existingFilename = path.basename(req.params.filename);
        const existingPath = path.join(uploadPath, existingFilename);

        if (fs.existsSync(existingPath)) {
            fs.unlinkSync(existingPath);
        }

        const fileInfo = buildFileInfo(req.file.filename);
        fileInfo.original_name = req.file.originalname;

        return res.json({ success: true, data: fileInfo });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to replace file.",
            error: error.message,
        });
    }
};

const deleteUpload = (req, res) => {
    try {
        const filename = path.basename(req.params.filename);
        const filePath = path.join(uploadPath, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: "File not found." });
        }

        fs.unlinkSync(filePath);

        return res.json({ success: true, message: "File deleted successfully." });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete file.",
            error: error.message,
        });
    }
};

module.exports = {
    listUploads,
    countUploads,
    createUpload,
    replaceUpload,
    deleteUpload,
};
