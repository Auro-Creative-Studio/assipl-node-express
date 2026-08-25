const express = require('express');

const router = express.Router();

const cookieConsentController = require('../controllers/cookie.consent.controller');

router.post('/', cookieConsentController.createCookieConsent);

router.get('/', cookieConsentController.getAllCookieConsents);

router.get('/:id', cookieConsentController.getCookieConsentById);

router.put('/:id', cookieConsentController.updateCookieConsent);

router.delete('/:id', cookieConsentController.deleteCookieConsent);

module.exports = router;