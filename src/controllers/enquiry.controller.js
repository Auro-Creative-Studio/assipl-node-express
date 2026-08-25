const db = require("../models");
const Enquiry = db.Enquiry;

// CREATE ENQUIRY
exports.createEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Enquiry created successfully",
            data: enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL ENQUIRIES
exports.getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: enquiries,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ENQUIRY BY ID
exports.getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE ENQUIRY
exports.updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        await enquiry.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Enquiry updated successfully",
            data: enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE ENQUIRY
exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        await enquiry.destroy();

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