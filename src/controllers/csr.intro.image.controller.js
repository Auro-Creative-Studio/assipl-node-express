const db = require("../models");

const CsrIntroImage = db.CsrIntroImage;

exports.createIntroImage = async (req, res) => {
    try {
        const introImage = await CsrIntroImage.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Intro image created successfully",
            data: introImage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getIntroImagesByCsr = async (req, res) => {
    try {
        const introImages = await CsrIntroImage.findAll({
            where: { csr_id: req.params.csrId },
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: introImages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getIntroImageById = async (req, res) => {
    try {
        const introImage = await CsrIntroImage.findByPk(req.params.id);

        if (!introImage) {
            return res.status(404).json({
                success: false,
                message: "Intro image not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: introImage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateIntroImage = async (req, res) => {
    try {
        const introImage = await CsrIntroImage.findByPk(req.params.id);

        if (!introImage) {
            return res.status(404).json({
                success: false,
                message: "Intro image not found",
            });
        }

        await introImage.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Intro image updated successfully",
            data: introImage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteIntroImage = async (req, res) => {
    try {
        const introImage = await CsrIntroImage.findByPk(req.params.id);

        if (!introImage) {
            return res.status(404).json({
                success: false,
                message: "Intro image not found",
            });
        }

        await introImage.destroy();

        return res.status(200).json({
            success: true,
            message: "Intro image deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
