const db = require("../models");
const { Op } = require("sequelize");

const BlogHub = db.BlogHub;

const createSlug = (title) => {
    return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const generateUniqueSlug = async (title, excludeBlogId = null) => {
    const baseSlug = createSlug(title);
    let slug = baseSlug;
    let suffix = 1;

    const where = {
        slug,
    };

    if (excludeBlogId) {
        where.id = {
            [Op.ne]: excludeBlogId,
        };
    }

    while (await BlogHub.findOne({ where })) {
        slug = `${baseSlug}-${suffix}`;
        where.slug = slug;
        suffix += 1;
    }

    return slug;
};

exports.createBlogHub = async (req, res) => {
    try {
        if (req.body.title && !req.body.slug) {
            req.body.slug = await generateUniqueSlug(req.body.title);
        }

        const blogHub = await BlogHub.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Blog Hub entry created successfully",
            data: blogHub,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllBlogHubs = async (req, res) => {
    try {
        const blogHubs = await BlogHub.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: blogHubs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getBlogHubById = async (req, res) => {
    try {
        const blogHub = await BlogHub.findByPk(req.params.id);

        if (!blogHub) {
            return res.status(404).json({
                success: false,
                message: "Blog Hub entry not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: blogHub,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
   
};

exports.updateBlogHub = async (req, res) => {
    try {
        const blogHub = await BlogHub.findByPk(req.params.id);

        if (!blogHub) {
            return res.status(404).json({
                success: false,
                message: "Blog Hub entry not found",
            });
        }

        if (req.body.title && !req.body.slug) {
            req.body.slug = await generateUniqueSlug(req.body.title, blogHub.id);
        }

        await blogHub.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Blog Hub entry updated successfully",
            data: blogHub,
        });
    } catch (error) {
    console.error("BlogHub Error:", error);

    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

exports.deleteBlogHub = async (req, res) => {
    try {
        const blogHub = await BlogHub.findByPk(req.params.id);

        if (!blogHub) {
            return res.status(404).json({
                success: false,
                message: "Blog Hub entry not found",
            });
        }

        await blogHub.destroy();

        return res.status(200).json({
            success: true,
            message: "Blog Hub entry deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}; 