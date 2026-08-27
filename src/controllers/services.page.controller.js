const db = require("../models");

const ServicesPage = db.ServicesPage;
const ServicesStrategic = db.ServicesStrategic;
const ServicesCoreProject = db.ServicesCoreProject;
const ServicesMaintenance = db.ServicesMaintenance;

const childInclude = [
    {
        model: ServicesStrategic,
        as: "strategic_items",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
    {
        model: ServicesCoreProject,
        as: "core_projects",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
    {
        model: ServicesMaintenance,
        as: "maintenance_items",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
];

const replaceChildren = async (Model, servicePageId, items) => {
    await Model.destroy({ where: { service_page_id: servicePageId } });

    if (!Array.isArray(items) || items.length === 0) return;

    await Model.bulkCreate(
        items.map((item, index) => ({
            ...item,
            id: undefined,
            service_page_id: servicePageId,
            sort_order: item.sort_order ?? index,
        }))
    );
};

exports.createServicesPage = async (req, res) => {
    try {
        const { strategic_items, core_projects, maintenance_items, ...pageData } = req.body;

        const servicesPage = await ServicesPage.create(pageData);

        if (strategic_items) await replaceChildren(ServicesStrategic, servicesPage.id, strategic_items);
        if (core_projects) await replaceChildren(ServicesCoreProject, servicesPage.id, core_projects);
        if (maintenance_items) await replaceChildren(ServicesMaintenance, servicesPage.id, maintenance_items);

        const createdPage = await ServicesPage.findByPk(servicesPage.id, {
            include: childInclude,
        });

        return res.status(201).json({
            success: true,
            message: "Services page created successfully",
            data: createdPage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllServicesPages = async (req, res) => {
    try {
        const pages = await ServicesPage.findAll({
            include: childInclude,
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: pages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getServicesPageById = async (req, res) => {
    try {
        const servicesPage = await ServicesPage.findByPk(req.params.id, {
            include: childInclude,
        });

        if (!servicesPage) {
            return res.status(404).json({
                success: false,
                message: "Services page not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: servicesPage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateServicesPage = async (req, res) => {
    try {
        const servicesPage = await ServicesPage.findByPk(req.params.id);

        if (!servicesPage) {
            return res.status(404).json({
                success: false,
                message: "Services page not found",
            });
        }

        const { strategic_items, core_projects, maintenance_items, ...pageData } = req.body;

        await servicesPage.update(pageData);

        if (strategic_items) await replaceChildren(ServicesStrategic, servicesPage.id, strategic_items);
        if (core_projects) await replaceChildren(ServicesCoreProject, servicesPage.id, core_projects);
        if (maintenance_items) await replaceChildren(ServicesMaintenance, servicesPage.id, maintenance_items);

        const updatedPage = await ServicesPage.findByPk(servicesPage.id, {
            include: childInclude,
        });

        return res.status(200).json({
            success: true,
            message: "Services page updated successfully",
            data: updatedPage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteServicesPage = async (req, res) => {
    try {
        const servicesPage = await ServicesPage.findByPk(req.params.id);

        if (!servicesPage) {
            return res.status(404).json({
                success: false,
                message: "Services page not found",
            });
        }

        await servicesPage.destroy();

        return res.status(200).json({
            success: true,
            message: "Services page deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
