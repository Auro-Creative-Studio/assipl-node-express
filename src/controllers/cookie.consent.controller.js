const db = require('../models');

const CookieConsent = db.CookieConsent;

const isLocalIp = (value) =>
    ["::1", "127.0.0.1", "localhost"].includes(String(value || "").trim());

const getClientIp = (req) => {
    const bodyIp = req.body.ip_address || req.body.ip;

    if (bodyIp && !isLocalIp(bodyIp)) {
        return bodyIp;
    }

    const forwardedIp = req.headers['x-forwarded-for']
        ?.split(',')[0]
        ?.trim();

    if (forwardedIp && !isLocalIp(forwardedIp)) {
        return forwardedIp;
    }

    return bodyIp || forwardedIp || req.ip || req.socket?.remoteAddress || '';
};

exports.createCookieConsent = async (req, res) => {
    try {
        const ip_address = getClientIp(req);

        const consent = await CookieConsent.create({
            session_id: req.body.session_id,
            ip_address,
            country: req.body.country,
            city: req.body.city,
            consent_timestamp: req.body.consent_timestamp,
            consent_type: req.body.consent_type,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            device: req.body.device,
            language: req.body.language,
            timezone: req.body.timezone,
        });

        return res.status(201).json({
            success: true,
            message: 'Cookie consent created successfully',
            data: consent,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



exports.getAllCookieConsents = async (req, res) => {
    try {
        const consents = await CookieConsent.findAll({
            order: [['id', 'DESC']],
        });

        return res.status(200).json({
            success: true,
            data: consents,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



exports.getCookieConsentById = async (req, res) => {
    try {
        const consent = await CookieConsent.findByPk(req.params.id);

        if (!consent) {
            return res.status(404).json({
                success: false,
                message: 'Cookie consent not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: consent,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



exports.updateCookieConsent = async (req, res) => {
    try {
        const consent = await CookieConsent.findByPk(req.params.id);

        if (!consent) {
            return res.status(404).json({
                success: false,
                message: 'Cookie consent not found',
            });
        }

        await consent.update(req.body);

        return res.status(200).json({
            success: true,
            message: 'Cookie consent updated successfully',
            data: consent,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



exports.deleteCookieConsent = async (req, res) => {
    try {
        const consent = await CookieConsent.findByPk(req.params.id);

        if (!consent) {
            return res.status(404).json({
                success: false,
                message: 'Cookie consent not found',
            });
        }

        await consent.destroy();

        return res.status(200).json({
            success: true,
            message: 'Cookie consent deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};