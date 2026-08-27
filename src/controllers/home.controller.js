const db = require("../models");

const Home = db.Home;

exports.createHome = async (req, res) => {
    try {
        const home = await Home.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Home page created successfully",
            data: home,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllHome = async (req, res) => {
    try {
        const homeList = await Home.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: homeList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getHomeById = async (req, res) => {
    try {
        const home = await Home.findByPk(req.params.id);

        if (!home) {
            return res.status(404).json({
                success: false,
                message: "Home page not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: home,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateHome = async (req, res) => {
    try {
        const home = await Home.findByPk(req.params.id);

        if (!home) {
            return res.status(404).json({
                success: false,
                message: "Home page not found",
            });
        }

        await home.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Home page updated successfully",
            data: home,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteHome = async (req, res) => {
    try {
        const home = await Home.findByPk(req.params.id);

        if (!home) {
            return res.status(404).json({
                success: false,
                message: "Home page not found",
            });
        }

        await home.destroy();

        return res.status(200).json({
            success: true,
            message: "Home page deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
