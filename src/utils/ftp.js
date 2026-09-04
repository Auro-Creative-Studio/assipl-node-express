const ftp = require("basic-ftp");

const uploadToCpanel = async (file) => {
    const client = new ftp.Client();

    try {
        client.ftp.verbose = false;

        await client.access({
            host: process.env.CPANEL_FTP_HOST,
            port: Number(process.env.CPANEL_FTP_PORT || 21),
            user: process.env.CPANEL_FTP_USER,
            password: process.env.CPANEL_FTP_PASSWORD,
            secure: process.env.CPANEL_FTP_SECURE === "true",
        });

        await client.ensureDir(process.env.CPANEL_UPLOAD_PATH);

        const extension = file.originalname.includes(".")
            ? "." + file.originalname.split(".").pop().toLowerCase()
            : "";

        const baseName = file.originalname
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase();

        const filename =
            `${baseName}-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}${extension}`;

        const remotePath =
            `${process.env.CPANEL_UPLOAD_PATH}/${filename}`;

        const stream = require("stream");
        const bufferStream = new stream.PassThrough();

        bufferStream.end(file.buffer);

        await client.uploadFrom(bufferStream, remotePath);

        return {
            filename,
            size: file.size,
            original_name: file.originalname,
        };
    } finally {
        client.close();
    }
};

module.exports = {
    uploadToCpanel,
};