const db = require("../models");
const { Op } = require("sequelize");

const Product = db.Product;

const createSlug = (title) => {
    return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const generateUniqueSlug = async (title, excludeProductId = null) => {
    const baseSlug = createSlug(title);
    let slug = baseSlug;
    let suffix = 1;

    const where = {
        slug,
    };

    if (excludeProductId) {
        where.id = {
            [Op.ne]: excludeProductId,
        };
    }

    while (await Product.findOne({ where })) {
        slug = `${baseSlug}-${suffix}`;
        where.slug = slug;
        suffix += 1;
    }

    return slug;
};

exports.createProduct = async (req, res) => {
    try {
        if (req.body.title && !req.body.slug) {
            req.body.slug = await generateUniqueSlug(req.body.title);
        }

        const product = await Product.create(req.body);
        const createdProduct = await Product.findByPk(product.id);

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: createdProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [["sort_order", "ASC"], ["id", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getPublishedProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                published: true,
            },
            order: [["sort_order", "ASC"], ["id", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.reorderProducts = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "ids must be a non-empty array",
            });
        }

        await Promise.all(
            ids.map((id, index) => Product.update({ sort_order: index }, { where: { id } }))
        );

        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                slug: req.params.slug,
            },
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (req.body.title && !req.body.slug) {
            req.body.slug = await generateUniqueSlug(req.body.title, product.id);
        }

        await product.update(req.body);

        const updatedProduct = await Product.findByPk(product.id);

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await product.destroy();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
