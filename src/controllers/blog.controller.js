const db = require("../models");
const { Op } = require("sequelize");

const Blog = db.Blog;
const BlogCategory = db.BlogCategory;

const includeCategory = [
    {
        model: BlogCategory,
        as: "category",
    },
];

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

    while (await Blog.findOne({ where })) {
        slug = `${baseSlug}-${suffix}`;
        where.slug = slug;
        suffix += 1;
    }

    return slug;
};

exports.createBlog = async (req, res) => {
    try {
        if (req.body.title && !req.body.slug) {
            req.body.slug = await generateUniqueSlug(req.body.title);
        }

        const blog = await Blog.create(req.body);
        const createdBlog = await Blog.findByPk(blog.id, {
            include: includeCategory,
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: createdBlog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: includeCategory,
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getPublishedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            where: {
                published: true,
            },
            include: includeCategory,
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id, {
            include: includeCategory,
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            where: {
                slug: req.params.slug,
            },
            include: includeCategory,
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (req.body.title && !req.body.slug) {
            req.body.slug = await generateUniqueSlug(req.body.title, blog.id);
        }

        await blog.update(req.body);

        const updatedBlog = await Blog.findByPk(blog.id, {
            include: includeCategory,
        });

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        await blog.destroy();

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
