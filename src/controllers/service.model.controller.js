const db = require("../models");

const ServiceModel = db.ServiceModel;

exports.createServiceModel = async (req, res) => {
    try {
        const model = await ServiceModel.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Service model created successfully",
            data: model,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getServiceModelsByService = async (req, res) => {
    try {
        const models = await ServiceModel.findAll({
            where: { service_id: req.params.serviceId },
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: models,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getServiceModelById = async (req, res) => {
    try {
        const model = await ServiceModel.findByPk(req.params.id);

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Service model not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: model,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateServiceModel = async (req, res) => {
    try {
        const model = await ServiceModel.findByPk(req.params.id);

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Service model not found",
            });
        }

        await model.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Service model updated successfully",
            data: model,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteServiceModel = async (req, res) => {
    try {
        const model = await ServiceModel.findByPk(req.params.id);

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Service model not found",
            });
        }

        await model.destroy();

        return res.status(200).json({
            success: true,
            message: "Service model deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
