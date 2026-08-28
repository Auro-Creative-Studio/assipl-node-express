const db = require('../models');

const CookieConsent = db.CookieConsent;

const normalizeIp = (value) => {
    const ip = String(value || '').trim();

    if (!ip) return '';
    if (ip.startsWith('::ffff:')) return ip.replace('::ffff:', '');

    return ip;
};

const isLocalIp = (value) => {
    const ip = normalizeIp(value);

    return ['::1', '127.0.0.1', 'localhost'].includes(ip);
};

const getHeaderIp = (req, headerName) => {
    const headerValue = req.headers[headerName];
    const value = Array.isArray(headerValue) ? headerValue[0] : headerValue;

    return normalizeIp(String(value || '').split(',')[0]);
};

const getClientIp = (req) => {
    const bodyIp = normalizeIp(req.body.ip_address || req.body.ip);

    if (bodyIp && !isLocalIp(bodyIp)) {
        return bodyIp;
    }

    const forwardedCandidates = [
        getHeaderIp(req, 'cf-connecting-ip'),
        getHeaderIp(req, 'true-client-ip'),
        getHeaderIp(req, 'x-real-ip'),
        getHeaderIp(req, 'x-forwarded-for'),
    ].filter(Boolean);

    const forwardedIp = forwardedCandidates.find((ip) => !isLocalIp(ip));

    if (forwardedIp) {
        return forwardedIp;
    }

    return bodyIp || forwardedCandidates[0] || normalizeIp(req.ip) || normalizeIp(req.socket?.remoteAddress);
};

const lookupGeoFromIp = async (ip) => {
    const normalizedIp = normalizeIp(ip);

    if (!normalizedIp) return null;

    const lookupUrl = isLocalIp(normalizedIp)
        ? 'https://ipapi.co/json/'
        : `https://ipapi.co/${encodeURIComponent(normalizedIp)}/json/`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
        const response = await fetch(lookupUrl, {
            signal: controller.signal,
            headers: {
                Accept: 'application/json',
                'User-Agent': 'assipl-cookie-consent/1.0',
            },
        });

        if (!response.ok) return null;

        const geo = await response.json();

        if (geo.error) return null;

        return {
            ip_address: normalizeIp(geo.ip) || normalizedIp,
            country: geo.country_name || geo.country || null,
            city: geo.city || null,
            latitude: geo.latitude != null ? String(geo.latitude) : null,
            longitude: geo.longitude != null ? String(geo.longitude) : null,
        };
    } catch {
        return null;
    } finally {
        clearTimeout(timeout);
    }
};

exports.createCookieConsent = async (req, res) => {
    try {
        const clientIp = getClientIp(req);

        const hasGeoInBody =
            req.body.country || req.body.city || req.body.latitude || req.body.longitude;

        const geo = hasGeoInBody ? null : await lookupGeoFromIp(clientIp);
        const bodyIp = normalizeIp(req.body.ip_address || req.body.ip);
        const ip_address = bodyIp && !isLocalIp(bodyIp) ? bodyIp : geo?.ip_address || clientIp;

        const consent = await CookieConsent.create({
            session_id: req.body.session_id,
            ip_address,
            country: req.body.country || geo?.country,
            city: req.body.city || geo?.city,
            consent_timestamp: req.body.consent_timestamp,
            consent_type: req.body.consent_type,
            latitude: req.body.latitude || geo?.latitude,
            longitude: req.body.longitude || geo?.longitude,
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
