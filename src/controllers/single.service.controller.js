const db = require("../models");
const { Op } = require("sequelize");

const SingleService = db.SingleService;
const SingleServiceAdvantage = db.SingleServiceAdvantage;
const ServiceModel = db.ServiceModel;

const childInclude = [
    {
        model: SingleServiceAdvantage,
        as: "advantages",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
    {
        model: ServiceModel,
        as: "models",
        separate: true,
        order: [["sort_order", "ASC"]],
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

const generateUniqueSlug = async (title, excludeServiceId = null) => {
    const baseSlug = createSlug(title);
    let slug = baseSlug;
    let suffix = 1;

    const where = {
        slug,
    };

    if (excludeServiceId) {
        where.id = {
            [Op.ne]: excludeServiceId,
        };
    }

    while (await SingleService.findOne({ where })) {
        slug = `${baseSlug}-${suffix}`;
        where.slug = slug;
        suffix += 1;
    }

    return slug;
};

const replaceAdvantages = async (serviceId, advantages) => {
    await SingleServiceAdvantage.destroy({ where: { service_id: serviceId } });

    if (!Array.isArray(advantages) || advantages.length === 0) return;

    await SingleServiceAdvantage.bulkCreate(
        advantages.map((advantage, index) => ({
            ...advantage,
            id: undefined,
            service_id: serviceId,
            sort_order: advantage.sort_order ?? index,
        }))
    );
};

const replaceModels = async (serviceId, models) => {
    await ServiceModel.destroy({ where: { service_id: serviceId } });

    if (!Array.isArray(models) || models.length === 0) return;

    await ServiceModel.bulkCreate(
        models.map((model, index) => ({
            ...model,
            id: undefined,
            service_id: serviceId,
            sort_order: model.sort_order ?? index,
        }))
    );
};

exports.createSingleService = async (req, res) => {
    try {
        const { advantages, models, ...serviceData } = req.body;

        if (serviceData.title && !serviceData.slug) {
            serviceData.slug = await generateUniqueSlug(serviceData.title);
        }

        const service = await SingleService.create(serviceData);

        if (advantages) await replaceAdvantages(service.id, advantages);
        if (models) await replaceModels(service.id, models);

        const createdService = await SingleService.findByPk(service.id, {
            include: childInclude,
        });

        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: createdService,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllSingleServices = async (req, res) => {
    try {
        const services = await SingleService.findAll({
            order: [["sort_order", "ASC"], ["id", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            data: services,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.reorderSingleServices = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "ids must be a non-empty array",
            });
        }

        await Promise.all(
            ids.map((id, index) => SingleService.update({ sort_order: index }, { where: { id } }))
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

exports.getSingleServiceById = async (req, res) => {
    try {
        const service = await SingleService.findByPk(req.params.id, {
            include: childInclude,
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getSingleServiceBySlug = async (req, res) => {
    try {
        const service = await SingleService.findOne({
            where: {
                slug: req.params.slug,
            },
            include: childInclude,
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateSingleService = async (req, res) => {
    try {
        const service = await SingleService.findByPk(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        const { advantages, models, ...serviceData } = req.body;

        if (serviceData.title && !serviceData.slug) {
            serviceData.slug = await generateUniqueSlug(serviceData.title, service.id);
        }

        await service.update(serviceData);

        if (advantages) await replaceAdvantages(service.id, advantages);
        if (models) await replaceModels(service.id, models);

        const updatedService = await SingleService.findByPk(service.id, {
            include: childInclude,
        });

        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: updatedService,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteSingleService = async (req, res) => {
    try {
        const service = await SingleService.findByPk(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        await service.destroy();

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
