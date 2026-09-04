const path = require("path");
const {
    uploadToCpanel,
    listUploadsFromCpanel,
    replaceOnCpanel,
    deleteFromCpanel,
} = require("../utils/ftp");

const RESUME_MAX_SIZE = 5 * 1024 * 1024;

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
const VIDEO_EXTENSIONS = [".mp4", ".webm"];

const getFileType = (extension) => {
    if (IMAGE_EXTENSIONS.includes(extension)) return "image";
    if (VIDEO_EXTENSIONS.includes(extension)) return "video";

    return "file";
};

const buildFileInfo = (entry) => {
    const extension = path.extname(entry.filename).toLowerCase();

    return {
        filename: entry.filename,
        original_name: entry.filename,
        type: getFileType(extension),
        extension,
        size: entry.size,
        updated_at: entry.modifiedAt || null,
        url: `${process.env.CPANEL_MEDIA_URL}/uploads/${entry.filename}`,
    };
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

const listUploads = async (req, res) => {
    try {
        const entries = await listUploadsFromCpanel();

        const files = entries
            .sort((a, b) => {
                const aTime = a.modifiedAt instanceof Date ? a.modifiedAt.getTime() : 0;
                const bTime = b.modifiedAt instanceof Date ? b.modifiedAt.getTime() : 0;

                return bTime - aTime;
            })
            .map(buildFileInfo);

        return res.status(200).json({
            success: true,
            data: files,
        });
    } catch (error) {
        console.error("List uploads error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to list uploaded files.",
            error: error.message,
        });
    }
};

const countUploads = async (req, res) => {
    try {
        const entries = await listUploadsFromCpanel();

        const counts = entries.reduce(
            (acc, entry) => {
                const type = getFileType(path.extname(entry.filename).toLowerCase());

                acc[type] += 1;
                acc.total += 1;

                return acc;
            },
            { total: 0, image: 0, video: 0, file: 0 }
        );

        return res.status(200).json({
            success: true,
            data: counts,
        });
    } catch (error) {
        console.error("Count uploads error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to count uploaded files.",
            error: error.message,
        });
    }
};

const replaceUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No replacement file was uploaded.",
            });
        }

        const filename = path.basename(req.params.filename);
        const replaced = await replaceOnCpanel(filename, req.file);

        return res.status(200).json({
            success: true,
            data: buildFileInfo({
                filename: replaced.filename,
                size: replaced.size,
                modifiedAt: new Date(),
            }),
        });
    } catch (error) {
        console.error("Replace upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to replace file.",
            error: error.message,
        });
    }
};

const deleteUpload = async (req, res) => {
    try {
        const filename = path.basename(req.params.filename);

        await deleteFromCpanel(filename);

        return res.status(200).json({
            success: true,
            message: "File deleted successfully.",
        });
    } catch (error) {
        console.error("Delete upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete file.",
            error: error.message,
        });
    }
};

module.exports = {
    createUpload,
    listUploads,
    countUploads,
    replaceUpload,
    deleteUpload,
};