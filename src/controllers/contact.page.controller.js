const db = require("../models");

const ContactPage = db.ContactPage;

exports.createContactPage = async (req, res) => {
    try {
        const contactPage = await ContactPage.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Contact page created successfully",
            data: contactPage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllContactPage = async (req, res) => {
    try {
        const contactPageList = await ContactPage.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: contactPageList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getLatestContactPage = async (req, res) => {
    try {
        const contactPage = await ContactPage.findOne({
            order: [["id", "DESC"]],
        });

        if (!contactPage) {
            return res.status(404).json({
                success: false,
                message: "Contact page not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: contactPage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getContactPageById = async (req, res) => {
    try {
        const contactPage = await ContactPage.findByPk(req.params.id);

        if (!contactPage) {
            return res.status(404).json({
                success: false,
                message: "Contact page not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: contactPage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateContactPage = async (req, res) => {
    try {
        const contactPage = await ContactPage.findByPk(req.params.id);

        if (!contactPage) {
            return res.status(404).json({
                success: false,
                message: "Contact page not found",
            });
        }

        await contactPage.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Contact page updated successfully",
            data: contactPage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteContactPage = async (req, res) => {
    try {
        const contactPage = await ContactPage.findByPk(req.params.id);

        if (!contactPage) {
            return res.status(404).json({
                success: false,
                message: "Contact page not found",
            });
        }

        await contactPage.destroy();

        return res.status(200).json({
            success: true,
            message: "Contact page deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
