const nodemailer = require("nodemailer");

const BRAND_NAME = "ASSIPL";
const BRAND_TAGLINE = "Engineering Smarter Security";
const BRAND_BLUE = "#2455f0";
const BRAND_DARK = "#111827";
const SITE_URL = (process.env.SITE_URL || "https://test22.tousquilfaut.com/").replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/assets/logo-dark.png`;

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

const renderEmailLayout = ({ preheader, bodyHtml }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${BRAND_NAME}</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
    <span style="display:none; font-size:1px; color:#f3f4f6; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
        ${preheader}
    </span>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
                    <tr>
                        <td align="center" style="padding:32px 32px 16px 32px;">
                            <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="180" style="display:block; width:180px; max-width:100%; height:auto;" />
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:8px 32px 32px 32px;">
                            ${bodyHtml}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:20px 32px; background-color:#f9fafb; border-top:1px solid #e5e7eb;">
                            <p style="margin:0 0 4px 0; font-size:12px; line-height:18px; color:#9ca3af; text-align:center;">
                                ${BRAND_TAGLINE}
                            </p>
                            <p style="margin:0; font-size:12px; line-height:18px; color:#9ca3af; text-align:center;">
                                &copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved. &middot;
                                <a href="${SITE_URL}" style="color:#9ca3af; text-decoration:underline;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

const sendPasswordResetOtp = async ({ to, otp, expiresInMinutes }) => {
    const transporter = getMailTransporter();
    const from = process.env.MAIL_FROM || process.env.MAIL_USER;

    const bodyHtml = `
        <h1 style="margin:0 0 4px 0; font-size:20px; line-height:28px; color:${BRAND_DARK}; text-align:center;">
            Password Reset Request
        </h1>
        <p style="margin:0 0 24px 0; font-size:14px; line-height:22px; color:#6b7280; text-align:center;">
            Use the one-time password (OTP) below to reset your ${BRAND_NAME} account password.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:8px 0 24px 0;">
                    <div style="display:inline-block; padding:14px 32px; background-color:#eff4ff; border:1px solid #dbe6ff; border-radius:10px;">
                        <span style="font-size:32px; line-height:38px; font-weight:700; letter-spacing:8px; color:${BRAND_BLUE};">
                            ${otp}
                        </span>
                    </div>
                </td>
            </tr>
        </table>

        <p style="margin:0 0 8px 0; font-size:14px; line-height:22px; color:#374151; text-align:center;">
            This OTP is valid for <strong>${expiresInMinutes} minutes</strong>.
        </p>
        <p style="margin:0; font-size:13px; line-height:20px; color:#9ca3af; text-align:center;">
            If you didn't request a password reset, you can safely ignore this email &mdash; your password will remain unchanged.
        </p>
    `;

    return transporter.sendMail({
        from: from ? `"${BRAND_NAME}" <${from}>` : undefined,
        to,
        subject: `Your ${BRAND_NAME} password reset OTP`,
        text: `Your password reset OTP is ${otp}. It will expire in ${expiresInMinutes} minutes. If you didn't request this, you can ignore this email.`,
        html: renderEmailLayout({
            preheader: `Your OTP is ${otp}. It expires in ${expiresInMinutes} minutes.`,
            bodyHtml,
        }),
    });
};

module.exports = {
    sendPasswordResetOtp,
};
