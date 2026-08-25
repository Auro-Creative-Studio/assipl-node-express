const db = require("../models");

const Seo = db.Seo;



// CREATE SEO
exports.createSeo = async (req, res) => {
    try {
        const seo = await Seo.create(req.body);

        return res.status(201).json({
            success: true,
            message: "SEO created successfully",
            data: seo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// GET ALL SEO
exports.getAllSeo = async (req, res) => {
    try {
        const seo = await Seo.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: seo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// GET SEO BY ID
exports.getSeoById = async (req, res) => {
    try {
        const seo = await Seo.findByPk(req.params.id);

        if (!seo) {
            return res.status(404).json({
                success: false,
                message: "SEO not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: seo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// GET SEO BY PAGE TYPE
exports.getSeoByPageType = async (req, res) => {
    try {
        const seo = await Seo.findOne({
            where: {
                page_type: req.params.page_type,
                is_active: true,
            },
        });

        if (!seo) {
            return res.status(404).json({
                success: false,
                message: "SEO not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: seo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// UPDATE SEO
exports.updateSeo = async (req, res) => {
    try {
        const seo = await Seo.findByPk(req.params.id);

        if (!seo) {
            return res.status(404).json({
                success: false,
                message: "SEO not found",
            });
        }

        await seo.update(req.body);

        return res.status(200).json({
            success: true,
            message: "SEO updated successfully",
            data: seo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// DELETE SEO
exports.deleteSeo = async (req, res) => {
    try {
        const seo = await Seo.findByPk(req.params.id);

        if (!seo) {
            return res.status(404).json({
                success: false,
                message: "SEO not found",
            });
        }

        await seo.destroy();

        return res.status(200).json({
            success: true,
            message: "SEO deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};