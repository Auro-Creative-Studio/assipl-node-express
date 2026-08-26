const db = require("../models");

const SingleServiceAdvantage = db.SingleServiceAdvantage;

exports.createAdvantage = async (req, res) => {
    try {
        const advantage = await SingleServiceAdvantage.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Advantage created successfully",
            data: advantage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAdvantagesByService = async (req, res) => {
    try {
        const advantages = await SingleServiceAdvantage.findAll({
            where: { service_id: req.params.serviceId },
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: advantages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAdvantageById = async (req, res) => {
    try {
        const advantage = await SingleServiceAdvantage.findByPk(req.params.id);

        if (!advantage) {
            return res.status(404).json({
                success: false,
                message: "Advantage not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: advantage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateAdvantage = async (req, res) => {
    try {
        const advantage = await SingleServiceAdvantage.findByPk(req.params.id);

        if (!advantage) {
            return res.status(404).json({
                success: false,
                message: "Advantage not found",
            });
        }

        await advantage.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Advantage updated successfully",
            data: advantage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteAdvantage = async (req, res) => {
    try {
        const advantage = await SingleServiceAdvantage.findByPk(req.params.id);

        if (!advantage) {
            return res.status(404).json({
                success: false,
                message: "Advantage not found",
            });
        }

        await advantage.destroy();

        return res.status(200).json({
            success: true,
            message: "Advantage deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
