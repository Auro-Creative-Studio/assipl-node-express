const db = require("../models");

const CsrSliderImage = db.CsrSliderImage;

exports.createSliderImage = async (req, res) => {
    try {
        const sliderImage = await CsrSliderImage.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Slider image created successfully",
            data: sliderImage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getSliderImagesByCsr = async (req, res) => {
    try {
        const sliderImages = await CsrSliderImage.findAll({
            where: { csr_id: req.params.csrId },
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: sliderImages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getSliderImageById = async (req, res) => {
    try {
        const sliderImage = await CsrSliderImage.findByPk(req.params.id);

        if (!sliderImage) {
            return res.status(404).json({
                success: false,
                message: "Slider image not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: sliderImage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateSliderImage = async (req, res) => {
    try {
        const sliderImage = await CsrSliderImage.findByPk(req.params.id);

        if (!sliderImage) {
            return res.status(404).json({
                success: false,
                message: "Slider image not found",
            });
        }

        await sliderImage.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Slider image updated successfully",
            data: sliderImage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteSliderImage = async (req, res) => {
    try {
        const sliderImage = await CsrSliderImage.findByPk(req.params.id);

        if (!sliderImage) {
            return res.status(404).json({
                success: false,
                message: "Slider image not found",
            });
        }

        await sliderImage.destroy();

        return res.status(200).json({
            success: true,
            message: "Slider image deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
