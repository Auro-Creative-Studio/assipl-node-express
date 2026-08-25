const nodemailer = require("nodemailer");

const getMailTransporter = () => {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
        throw new Error("MAIL_USER and MAIL_PASS are required to send emails");
    }

    return nodemailer.createTransport({
        host: process.env.MAIL_HOST || "smtp.gmail.com",
        port: Number(process.env.MAIL_PORT) || 587,
        secure: process.env.MAIL_SECURE === "true",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
};

const sendPasswordResetOtp = async ({ to, otp, expiresInMinutes }) => {
    const transporter = getMailTransporter();
    const from = process.env.MAIL_FROM || process.env.MAIL_USER;

    return transporter.sendMail({
        from,
        to,
        subject: "Your Royal4Media password reset OTP",
        text: `Your password reset OTP is ${otp}. It will expire in ${expiresInMinutes} minutes.`,
        html: `
            <p>Your password reset OTP is:</p>
            <h2>${otp}</h2>
            <p>This OTP will expire in ${expiresInMinutes} minutes.</p>
        `,
    });
};

module.exports = {
    sendPasswordResetOtp,
};
