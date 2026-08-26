const db = require("../models");
const EnquireForm = db.EnquireForm;

exports.createEnquireForm = async (req, res) => {
    try {
        const enquireForm = await EnquireForm.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: enquireForm,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllEnquireForms = async (req, res) => {
    try {
        const enquireForms = await EnquireForm.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: enquireForms,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getEnquireFormById = async (req, res) => {
    try {
        const enquireForm = await EnquireForm.findByPk(req.params.id);

        if (!enquireForm) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: enquireForm,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateEnquireForm = async (req, res) => {
    try {
        const enquireForm = await EnquireForm.findByPk(req.params.id);

        if (!enquireForm) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        await enquireForm.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Enquiry updated successfully",
            data: enquireForm,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteEnquireForm = async (req, res) => {
    try {
        const enquireForm = await EnquireForm.findByPk(req.params.id);

        if (!enquireForm) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        await enquireForm.destroy();

        return res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
