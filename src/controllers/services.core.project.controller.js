const db = require("../models");

const ServicesCoreProject = db.ServicesCoreProject;

exports.createCoreProjectItem = async (req, res) => {
    try {
        const item = await ServicesCoreProject.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Core project item created successfully",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getCoreProjectItemsByPage = async (req, res) => {
    try {
        const items = await ServicesCoreProject.findAll({
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

exports.getCoreProjectItemById = async (req, res) => {
    try {
        const item = await ServicesCoreProject.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Core project item not found",
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

exports.updateCoreProjectItem = async (req, res) => {
    try {
        const item = await ServicesCoreProject.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Core project item not found",
            });
        }

        await item.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Core project item updated successfully",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteCoreProjectItem = async (req, res) => {
    try {
        const item = await ServicesCoreProject.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Core project item not found",
            });
        }

        await item.destroy();

        return res.status(200).json({
            success: true,
            message: "Core project item deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
