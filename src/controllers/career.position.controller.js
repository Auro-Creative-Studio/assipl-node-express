const db = require("../models");
const CareerPosition = db.CareerPosition;

exports.createCareerPosition = async (req, res) => {
    try {
        const careerPosition = await CareerPosition.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Career position created successfully",
            data: careerPosition,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllCareerPositions = async (req, res) => {
    try {
        const careerPositions = await CareerPosition.findAll({
            order: [["sort_order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: careerPositions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getCareerPositionById = async (req, res) => {
    try {
        const careerPosition = await CareerPosition.findByPk(req.params.id);

        if (!careerPosition) {
            return res.status(404).json({
                success: false,
                message: "Career position not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: careerPosition,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateCareerPosition = async (req, res) => {
    try {
        const careerPosition = await CareerPosition.findByPk(req.params.id);

        if (!careerPosition) {
            return res.status(404).json({
                success: false,
                message: "Career position not found",
            });
        }

        await careerPosition.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Career position updated successfully",
            data: careerPosition,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteCareerPosition = async (req, res) => {
    try {
        const careerPosition = await CareerPosition.findByPk(req.params.id);

        if (!careerPosition) {
            return res.status(404).json({
                success: false,
                message: "Career position not found",
            });
        }

        await careerPosition.destroy();

        return res.status(200).json({
            success: true,
            message: "Career position deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
