const db = require("../models");

const Process = db.Process;

exports.createProcess = async (req, res) => {
    try {
        const process = await Process.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Process page created successfully",
            data: process,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllProcess = async (req, res) => {
    try {
        const processList = await Process.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: processList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getProcessById = async (req, res) => {
    try {
        const process = await Process.findByPk(req.params.id);

        if (!process) {
            return res.status(404).json({
                success: false,
                message: "Process page not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: process,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateProcess = async (req, res) => {
    try {
        const process = await Process.findByPk(req.params.id);

        if (!process) {
            return res.status(404).json({
                success: false,
                message: "Process page not found",
            });
        }

        await process.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Process page updated successfully",
            data: process,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteProcess = async (req, res) => {
    try {
        const process = await Process.findByPk(req.params.id);

        if (!process) {
            return res.status(404).json({
                success: false,
                message: "Process page not found",
            });
        }

        await process.destroy();

        return res.status(200).json({
            success: true,
            message: "Process page deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
