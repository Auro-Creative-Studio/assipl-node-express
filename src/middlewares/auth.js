const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.User;
const UserRole = db.UserRole;

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            include: [{ model: UserRole, as: "role" }],
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization token",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authorization token",
        });
    }
};

module.exports = auth;
