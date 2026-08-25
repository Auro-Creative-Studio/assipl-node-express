const { UniqueConstraintError } = require("sequelize");
const db = require("../models");

const Subscriber = db.NewsletterSubscriber;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.subscribe = async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        if (!EMAIL_PATTERN.test(email)) {
            return res.status(400).json({ success: false, message: "A valid email address is required" });
        }

        const subscriber = await Subscriber.create({ email });
        return res.status(201).json({
            success: true,
            message: "Subscribed successfully",
            data: subscriber,
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(409).json({ success: false, message: "This email is already subscribed" });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAll = async (_req, res) => {
    try {
        const subscribers = await Subscriber.findAll({
            order: [["created_at", "DESC"], ["id", "DESC"]],
        });
        return res.status(200).json({ success: true, data: subscribers });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const subscriber = await Subscriber.findByPk(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ success: false, message: "Subscriber not found" });
        }
        await subscriber.destroy();
        return res.status(200).json({ success: true, message: "Subscriber deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
