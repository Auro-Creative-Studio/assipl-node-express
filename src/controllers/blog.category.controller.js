const db = require("../models");

const BlogCategory = db.BlogCategory;
const Blog = db.Blog;

exports.createBlogCategory = async (req, res) => {
    try {
        const category = await BlogCategory.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Blog category created successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllBlogCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getBlogCategoryById = async (req, res) => {
    try {
        const category = await BlogCategory.findByPk(req.params.id, {
            include: [
                {
                    model: Blog,
                    as: "blogs",
                },
            ],
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Blog category not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateBlogCategory = async (req, res) => {
    try {
        const category = await BlogCategory.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Blog category not found",
            });
        }

        await category.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Blog category updated successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteBlogCategory = async (req, res) => {
    try {
        const category = await BlogCategory.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Blog category not found",
            });
        }

        await category.destroy();

        return res.status(200).json({
            success: true,
            message: "Blog category deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
