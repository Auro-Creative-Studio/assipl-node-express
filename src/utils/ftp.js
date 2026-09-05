const ftp = require("basic-ftp");
const stream = require("stream");

const withFtpClient = async (fn) => {
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

        return await fn(client);
    } finally {
        client.close();
    }
};

const uploadToCpanel = async (file) => {
    return withFtpClient(async (client) => {
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

        const bufferStream = new stream.PassThrough();

        bufferStream.end(file.buffer);

        await client.uploadFrom(bufferStream, remotePath);

        return {
            filename,
            size: file.size,
            original_name: file.originalname,
        };
    });
};

const listUploadsFromCpanel = async () => {
    return withFtpClient(async (client) => {
        const entries = await client.list(process.env.CPANEL_UPLOAD_PATH);

        return entries
            .filter((entry) => entry.isFile && !entry.name.startsWith("."))
            .map((entry) => ({
                filename: entry.name,
                size: entry.size,
                modifiedAt: entry.modifiedAt || entry.rawModifiedAt || null,
            }));
    });
};

const replaceOnCpanel = async (filename, file) => {
    return withFtpClient(async (client) => {
        await client.ensureDir(process.env.CPANEL_UPLOAD_PATH);

        const remotePath = `${process.env.CPANEL_UPLOAD_PATH}/${filename}`;
        const bufferStream = new stream.PassThrough();

        bufferStream.end(file.buffer);

        await client.uploadFrom(bufferStream, remotePath);

        return { filename, size: file.size };
    });
};

const deleteFromCpanel = async (filename) => {
    return withFtpClient(async (client) => {
        await client.remove(`${process.env.CPANEL_UPLOAD_PATH}/${filename}`);
    });
};

module.exports = {
    uploadToCpanel,
    listUploadsFromCpanel,
    replaceOnCpanel,
    deleteFromCpanel,
};