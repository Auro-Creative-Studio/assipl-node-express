const db = require("../models");

const AboutLogo = db.AboutLogo;

exports.createLogo = async (req, res) => {
    try {
        const logo = await AboutLogo.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Logo created successfully",
            data: logo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getLogosByAbout = async (req, res) => {
    try {
        const logos = await AboutLogo.findAll({
            where: { about_id: req.params.aboutId },
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: logos,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getLogoById = async (req, res) => {
    try {
        const logo = await AboutLogo.findByPk(req.params.id);

        if (!logo) {
            return res.status(404).json({
                success: false,
                message: "Logo not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: logo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateLogo = async (req, res) => {
    try {
        const logo = await AboutLogo.findByPk(req.params.id);

        if (!logo) {
            return res.status(404).json({
                success: false,
                message: "Logo not found",
            });
        }

        await logo.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Logo updated successfully",
            data: logo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteLogo = async (req, res) => {
    try {
        const logo = await AboutLogo.findByPk(req.params.id);

        if (!logo) {
            return res.status(404).json({
                success: false,
                message: "Logo not found",
            });
        }

        await logo.destroy();

        return res.status(200).json({
            success: true,
            message: "Logo deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
