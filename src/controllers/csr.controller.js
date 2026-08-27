const db = require("../models");

const Csr = db.Csr;
const CsrIntroImage = db.CsrIntroImage;
const CsrSliderImage = db.CsrSliderImage;

const childInclude = [
    {
        model: CsrIntroImage,
        as: "intro_images",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
    {
        model: CsrSliderImage,
        as: "slider_images",
        separate: true,
        order: [["sort_order", "ASC"]],
    },
];

const replaceIntroImages = async (csrId, images) => {
    await CsrIntroImage.destroy({ where: { csr_id: csrId } });

    if (!Array.isArray(images) || images.length === 0) return;

    await CsrIntroImage.bulkCreate(
        images.map((image, index) => ({
            ...image,
            id: undefined,
            csr_id: csrId,
            sort_order: image.sort_order ?? index,
        }))
    );
};

const replaceSliderImages = async (csrId, images) => {
    await CsrSliderImage.destroy({ where: { csr_id: csrId } });

    if (!Array.isArray(images) || images.length === 0) return;

    await CsrSliderImage.bulkCreate(
        images.map((image, index) => ({
            ...image,
            id: undefined,
            csr_id: csrId,
            sort_order: image.sort_order ?? index,
        }))
    );
};

exports.createCsr = async (req, res) => {
    try {
        const { intro_images, slider_images, ...csrData } = req.body;

        const csr = await Csr.create(csrData);

        if (intro_images) await replaceIntroImages(csr.id, intro_images);
        if (slider_images) await replaceSliderImages(csr.id, slider_images);

        const createdCsr = await Csr.findByPk(csr.id, {
            include: childInclude,
        });

        return res.status(201).json({
            success: true,
            message: "CSR created successfully",
            data: createdCsr,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllCsr = async (req, res) => {
    try {
        const csrList = await Csr.findAll({
            include: childInclude,
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: csrList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getCsrById = async (req, res) => {
    try {
        const csr = await Csr.findByPk(req.params.id, {
            include: childInclude,
        });

        if (!csr) {
            return res.status(404).json({
                success: false,
                message: "CSR not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: csr,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateCsr = async (req, res) => {
    try {
        const csr = await Csr.findByPk(req.params.id);

        if (!csr) {
            return res.status(404).json({
                success: false,
                message: "CSR not found",
            });
        }

        const { intro_images, slider_images, ...csrData } = req.body;

        await csr.update(csrData);

        if (intro_images) await replaceIntroImages(csr.id, intro_images);
        if (slider_images) await replaceSliderImages(csr.id, slider_images);

        const updatedCsr = await Csr.findByPk(csr.id, {
            include: childInclude,
        });

        return res.status(200).json({
            success: true,
            message: "CSR updated successfully",
            data: updatedCsr,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteCsr = async (req, res) => {
    try {
        const csr = await Csr.findByPk(req.params.id);

        if (!csr) {
            return res.status(404).json({
                success: false,
                message: "CSR not found",
            });
        }

        await csr.destroy();

        return res.status(200).json({
            success: true,
            message: "CSR deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
