const db = require("../models");
const { Op } = require("sequelize");

const User = db.User;
const UserRole = db.UserRole;
const PasswordResetOtp = db.PasswordResetOtp;

const userRoleInclude = {
    model: UserRole,
    as: "role",
    attributes: ["id", "name", "description", "type"],
};

const createUser = async (data) => {
    return User.create(data);
};

const getAllUsers = async () => {
    return User.findAll({
        include: [userRoleInclude],
        order: [["id", "DESC"]],
    });
};

const getUserById = async (id) => {
    return User.findByPk(id, {
        include: [userRoleInclude],
    });
};

const getUserByEmail = async (email) => {
    return User.findOne({
        where: { email },
    });
};

const getUserByEmailWithPassword = async (email) => {
    return User.scope("withPassword").findOne({
        where: { email },
        include: [userRoleInclude],
    });
};

const updateUser = async (user, data) => {
    await user.update(data);
    return user.reload({
        include: [userRoleInclude],
    });
};

const updateUserPassword = async (user, password) => {
    return user.update({ password });
};

const deleteUser = async (user) => {
    return user.destroy();
};

const getAllRoles = async () => {
    return UserRole.findAll({
        order: [["id", "ASC"]],
    });
};

const getRoleById = async (id) => {
    return UserRole.findByPk(id);
};

const createPasswordResetOtp = async ({ userId, otpHash, purpose, expiresAt }) => {
    await PasswordResetOtp.update(
        { used_at: new Date() },
        {
            where: {
                user_id: userId,
                purpose,
                used_at: null,
            },
        }
    );

    return PasswordResetOtp.create({
        user_id: userId,
        otp_hash: otpHash,
        purpose,
        expires_at: expiresAt,
    });
};

const getValidPasswordResetOtp = async ({ userId, otpHash, purpose }) => {
    return PasswordResetOtp.findOne({
        where: {
            user_id: userId,
            otp_hash: otpHash,
            purpose,
            used_at: null,
            expires_at: {
                [Op.gt]: new Date(),
            },
        },
        order: [["id", "DESC"]],
    });
};

const markPasswordResetOtpUsed = async (passwordResetOtp) => {
    return passwordResetOtp.update({
        used_at: new Date(),
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByEmailWithPassword,
    updateUser,
    updateUserPassword,
    deleteUser,
    getAllRoles,
    getRoleById,
    createPasswordResetOtp,
    getValidPasswordResetOtp,
    markPasswordResetOtpUsed,
};
