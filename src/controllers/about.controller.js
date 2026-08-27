const db = require("../models");

const About = db.About;
const AboutLogo = db.AboutLogo;
const AboutFeature = db.AboutFeature;

const childInclude = [
    {
        model: AboutLogo,
        as: "logos",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
    {
        model: AboutFeature,
        as: "features",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
];

const replaceLogos = async (aboutId, logos) => {
    await AboutLogo.destroy({ where: { about_id: aboutId } });

    if (!Array.isArray(logos) || logos.length === 0) return;

    await AboutLogo.bulkCreate(
        logos.map((logo, index) => ({
            ...logo,
            id: undefined,
            about_id: aboutId,
            sort_order: logo.sort_order ?? index,
        }))
    );
};

const replaceFeatures = async (aboutId, features) => {
    await AboutFeature.destroy({ where: { about_id: aboutId } });

    if (!Array.isArray(features) || features.length === 0) return;

    await AboutFeature.bulkCreate(
        features.map((feature, index) => ({
            ...feature,
            id: undefined,
            about_id: aboutId,
            sort_order: feature.sort_order ?? index,
        }))
    );
};

exports.createAbout = async (req, res) => {
    try {
        const { logos, features, ...aboutData } = req.body;

        const about = await About.create(aboutData);

        if (logos) await replaceLogos(about.id, logos);
        if (features) await replaceFeatures(about.id, features);

        const createdAbout = await About.findByPk(about.id, {
            include: childInclude,
        });

        return res.status(201).json({
            success: true,
            message: "About page created successfully",
            data: createdAbout,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllAbout = async (req, res) => {
    try {
        const aboutList = await About.findAll({
            include: childInclude,
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: aboutList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAboutById = async (req, res) => {
    try {
        const about = await About.findByPk(req.params.id, {
            include: childInclude,
        });

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About page not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: about,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateAbout = async (req, res) => {
    try {
        const about = await About.findByPk(req.params.id);

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About page not found",
            });
        }

        const { logos, features, ...aboutData } = req.body;

        await about.update(aboutData);

        if (logos) await replaceLogos(about.id, logos);
        if (features) await replaceFeatures(about.id, features);

        const updatedAbout = await About.findByPk(about.id, {
            include: childInclude,
        });

        return res.status(200).json({
            success: true,
            message: "About page updated successfully",
            data: updatedAbout,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteAbout = async (req, res) => {
    try {
        const about = await About.findByPk(req.params.id);

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About page not found",
            });
        }

        await about.destroy();

        return res.status(200).json({
            success: true,
            message: "About page deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
