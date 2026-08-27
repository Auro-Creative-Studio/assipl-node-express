const db = require("../models");

const AboutFeature = db.AboutFeature;

exports.createFeature = async (req, res) => {
    try {
        const feature = await AboutFeature.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Feature created successfully",
            data: feature,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getFeaturesByAbout = async (req, res) => {
    try {
        const features = await AboutFeature.findAll({
            where: { about_id: req.params.aboutId },
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: features,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getFeatureById = async (req, res) => {
    try {
        const feature = await AboutFeature.findByPk(req.params.id);

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: feature,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateFeature = async (req, res) => {
    try {
        const feature = await AboutFeature.findByPk(req.params.id);

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }

        await feature.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Feature updated successfully",
            data: feature,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteFeature = async (req, res) => {
    try {
        const feature = await AboutFeature.findByPk(req.params.id);

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }

        await feature.destroy();

        return res.status(200).json({
            success: true,
            message: "Feature deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
