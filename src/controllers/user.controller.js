const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const mailService = require("../services/mail.service");
const { isSuperAdmin } = require("../middlewares/superAdmin");

const OTP_EXPIRY_MINUTES = 10;
const JWT_EXPIRES_IN = "7d";

const generateOtp = () => String(crypto.randomInt(100000, 1000000));

const hashOtp = (otp) => crypto.createHash("sha256").update(otp).digest("hex");

const sanitizeUser = (user) => {
    if (!user) return null;

    const plain = user.toJSON ? user.toJSON() : { ...user };
    delete plain.password;
    return plain;
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await userService.getUserByEmailWithPassword(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        return res.json({
            success: true,
            token,
            data: sanitizeUser(user),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to login.",
            error: error.message,
        });
    }
};

const requestForgotPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        const user = await userService.getUserByEmail(email);

        if (user) {
            const otp = generateOtp();
            const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

            await userService.createPasswordResetOtp({
                userId: user.id,
                otpHash: hashOtp(otp),
                purpose: "forgot_password",
                expiresAt,
            });

            await mailService.sendPasswordResetOtp({
                to: user.email,
                otp,
                expiresInMinutes: OTP_EXPIRY_MINUTES,
            });
        }

        return res.json({
            success: true,
            message: "If an account exists for this email, an OTP has been sent.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP.",
            error: error.message,
        });
    }
};

const resetForgotPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return res.status(400).json({
                success: false,
                message: "Email, OTP, and new password are required.",
            });
        }

        const user = await userService.getUserByEmail(email);
        const validOtp =
            user &&
            (await userService.getValidPasswordResetOtp({
                userId: user.id,
                otpHash: hashOtp(otp),
                purpose: "forgot_password",
            }));

        if (!validOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.updateUserPassword(user, hashedPassword);
        await userService.markPasswordResetOtpUsed(validOtp);

        return res.json({
            success: true,
            message: "Password reset successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to reset password.",
            error: error.message,
        });
    }
};

const requestProfilePasswordOtp = async (req, res) => {
    try {
        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        await userService.createPasswordResetOtp({
            userId: req.user.id,
            otpHash: hashOtp(otp),
            purpose: "profile_password_reset",
            expiresAt,
        });

        await mailService.sendPasswordResetOtp({
            to: req.user.email,
            otp,
            expiresInMinutes: OTP_EXPIRY_MINUTES,
        });

        return res.json({
            success: true,
            message: "OTP sent to your email.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP.",
            error: error.message,
        });
    }
};

const resetProfilePassword = async (req, res) => {
    try {
        const { otp, password } = req.body;

        if (!otp || !password) {
            return res.status(400).json({
                success: false,
                message: "OTP and new password are required.",
            });
        }

        const validOtp = await userService.getValidPasswordResetOtp({
            userId: req.user.id,
            otpHash: hashOtp(otp),
            purpose: "profile_password_reset",
        });

        if (!validOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.updateUserPassword(req.user, hashedPassword);
        await userService.markPasswordResetOtpUsed(validOtp);

        return res.json({
            success: true,
            message: "Password updated successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to reset password.",
            error: error.message,
        });
    }
};

const listRoles = async (req, res) => {
    try {
        const roles = await userService.getAllRoles();
        return res.json({ success: true, data: roles });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch roles.",
            error: error.message,
        });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.json({ success: true, data: users });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users.",
            error: error.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const targetId = Number(req.params.id);

        if (!isSuperAdmin(req.user) && req.user.id !== targetId) {
            return res.status(403).json({
                success: false,
                message: "You can only access your own profile.",
            });
        }

        const user = await userService.getUserById(targetId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.json({ success: true, data: user });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user.",
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, phone_number, password, role_id } = req.body;

        if (!first_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "First name, email, and password are required.",
            });
        }

        const existingUser = await userService.getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userService.createUser({
            first_name,
            last_name,
            email,
            phone_number,
            password: hashedPassword,
            role_id: role_id || null,
        });

        const createdUser = await userService.getUserById(user.id);

        return res.status(201).json({ success: true, data: createdUser });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create user.",
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const targetId = Number(req.params.id);
        const requesterIsSuperAdmin = isSuperAdmin(req.user);

        if (!requesterIsSuperAdmin && req.user.id !== targetId) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own profile.",
            });
        }

        const user = await userService.getUserById(targetId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const { first_name, last_name, email, phone_number, password, role_id } = req.body;
        const updates = {};

        if (first_name !== undefined) updates.first_name = first_name;
        if (last_name !== undefined) updates.last_name = last_name;
        if (email !== undefined) updates.email = email;
        if (phone_number !== undefined) updates.phone_number = phone_number;

        if (requesterIsSuperAdmin) {
            if (role_id !== undefined) updates.role_id = role_id || null;
            if (password) updates.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await userService.updateUser(user, updates);

        return res.json({ success: true, data: updatedUser });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update user.",
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const targetId = Number(req.params.id);

        if (req.user.id === targetId) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account.",
            });
        }

        const user = await userService.getUserById(targetId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        await userService.deleteUser(user);

        return res.json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete user.",
            error: error.message,
        });
    }
};

module.exports = {
    login,
    requestForgotPasswordOtp,
    resetForgotPassword,
    requestProfilePasswordOtp,
    resetProfilePassword,
    listRoles,
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
