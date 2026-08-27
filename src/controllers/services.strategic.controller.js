const db = require("../models");

const ServicesStrategic = db.ServicesStrategic;

exports.createStrategicItem = async (req, res) => {
    try {
        const item = await ServicesStrategic.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Strategic item created successfully",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getStrategicItemsByPage = async (req, res) => {
    try {
        const items = await ServicesStrategic.findAll({
            where: { service_page_id: req.params.servicePageId },
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: items,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getStrategicItemById = async (req, res) => {
    try {
        const item = await ServicesStrategic.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Strategic item not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateStrategicItem = async (req, res) => {
    try {
        const item = await ServicesStrategic.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Strategic item not found",
            });
        }

        await item.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Strategic item updated successfully",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteStrategicItem = async (req, res) => {
    try {
        const item = await ServicesStrategic.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Strategic item not found",
            });
        }

        await item.destroy();

        return res.status(200).json({
            success: true,
            message: "Strategic item deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
