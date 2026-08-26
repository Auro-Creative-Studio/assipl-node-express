const db = require("../models");
const CareerForm = db.CareerForm;
const CareerPosition = db.CareerPosition;

const positionInclude = {
    model: CareerPosition,
    as: "position",
};

exports.createCareerForm = async (req, res) => {
    try {
        const careerForm = await CareerForm.create(req.body);
        const createdCareerForm = await CareerForm.findByPk(careerForm.id, {
            include: positionInclude,
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: createdCareerForm,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllCareerForms = async (req, res) => {
    try {
        const careerForms = await CareerForm.findAll({
            include: positionInclude,
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: careerForms,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getCareerFormById = async (req, res) => {
    try {
        const careerForm = await CareerForm.findByPk(req.params.id, {
            include: positionInclude,
        });

        if (!careerForm) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: careerForm,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateCareerForm = async (req, res) => {
    try {
        const careerForm = await CareerForm.findByPk(req.params.id);

        if (!careerForm) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        await careerForm.update(req.body);

        const updatedCareerForm = await CareerForm.findByPk(careerForm.id, {
            include: positionInclude,
        });

        return res.status(200).json({
            success: true,
            message: "Application updated successfully",
            data: updatedCareerForm,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteCareerForm = async (req, res) => {
    try {
        const careerForm = await CareerForm.findByPk(req.params.id);

        if (!careerForm) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        await careerForm.destroy();

        return res.status(200).json({
            success: true,
            message: "Application deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
