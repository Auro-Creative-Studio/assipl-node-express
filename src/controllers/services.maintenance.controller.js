const db = require("../models");

const ServicesMaintenance = db.ServicesMaintenance;

exports.createMaintenanceItem = async (req, res) => {
    try {
        const item = await ServicesMaintenance.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Maintenance item created successfully",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getMaintenanceItemsByPage = async (req, res) => {
    try {
        const items = await ServicesMaintenance.findAll({
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

exports.getMaintenanceItemById = async (req, res) => {
    try {
        const item = await ServicesMaintenance.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Maintenance item not found",
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

exports.updateMaintenanceItem = async (req, res) => {
    try {
        const item = await ServicesMaintenance.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Maintenance item not found",
            });
        }

        await item.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Maintenance item updated successfully",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteMaintenanceItem = async (req, res) => {
    try {
        const item = await ServicesMaintenance.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Maintenance item not found",
            });
        }

        await item.destroy();

        return res.status(200).json({
            success: true,
            message: "Maintenance item deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
