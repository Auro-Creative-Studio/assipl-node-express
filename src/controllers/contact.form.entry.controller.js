const db = require("../models");
const ContactFormEntry = db.ContactFormEntry;

exports.createContactFormEntry = async (req, res) => {
    try {
        const contactFormEntry = await ContactFormEntry.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Contact form submitted successfully",
            data: contactFormEntry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllContactFormEntries = async (req, res) => {
    try {
        const contactFormEntries = await ContactFormEntry.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: contactFormEntries,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getContactFormEntryById = async (req, res) => {
    try {
        const contactFormEntry = await ContactFormEntry.findByPk(req.params.id);

        if (!contactFormEntry) {
            return res.status(404).json({
                success: false,
                message: "Contact form entry not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: contactFormEntry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateContactFormEntry = async (req, res) => {
    try {
        const contactFormEntry = await ContactFormEntry.findByPk(req.params.id);

        if (!contactFormEntry) {
            return res.status(404).json({
                success: false,
                message: "Contact form entry not found",
            });
        }

        await contactFormEntry.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Contact form entry updated successfully",
            data: contactFormEntry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteContactFormEntry = async (req, res) => {
    try {
        const contactFormEntry = await ContactFormEntry.findByPk(req.params.id);

        if (!contactFormEntry) {
            return res.status(404).json({
                success: false,
                message: "Contact form entry not found",
            });
        }

        await contactFormEntry.destroy();

        return res.status(200).json({
            success: true,
            message: "Contact form entry deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
