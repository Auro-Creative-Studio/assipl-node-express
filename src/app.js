const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
// const fs = require('fs');
const sitemapRoutes = require('./routes/sitemap.routes');
// const { renderIndexHtml } = require('./utils/renderIndexHtml');

const seoRoutes = require('./routes/seo.routes');
const cookieConsentRoutes = require('./routes/cookie.consent.routes');
const contactRoutes = require('./routes/contact.form.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const blogRoutes = require('./routes/blog.routes');
const productRoutes = require('./routes/product.routes');
const newsletterSubscriberRoutes = require('./routes/newsletter.subscriber.routes');
const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes');
const singleServiceRoutes = require('./routes/single.service.routes');
const singleServiceAdvantageRoutes = require('./routes/single.service.advantage.routes');
const serviceModelRoutes = require('./routes/service.model.routes');
const enquireFormRoutes = require('./routes/enquire.form.routes');
const contactFormEntryRoutes = require('./routes/contact.form.entry.routes');
const careerPositionRoutes = require('./routes/career.position.routes');
const careerFormRoutes = require('./routes/career.form.routes');
const csrRoutes = require('./routes/csr.routes');
const csrIntroImageRoutes = require('./routes/csr.intro.image.routes');
const csrSliderImageRoutes = require('./routes/csr.slider.image.routes');
const homeRoutes = require('./routes/home.routes');
const processRoutes = require('./routes/process.routes');
const contactPageRoutes = require('./routes/contact.page.routes');
const aboutRoutes = require('./routes/about.routes');
const aboutLogoRoutes = require('./routes/about.logo.routes');
const aboutFeatureRoutes = require('./routes/about.feature.routes');
const servicesPageRoutes = require('./routes/services.page.routes');
const servicesStrategicRoutes = require('./routes/services.strategic.routes');
const servicesCoreProjectRoutes = require('./routes/services.core.project.routes');
const servicesMaintenanceRoutes = require('./routes/services.maintenance.routes');
const app = express();

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/uploads/:filename', async (req, res) => {
    try {
        const filename = path.basename(req.params.filename);

        const fileUrl = `${process.env.CPANEL_MEDIA_URL}/uploads/${encodeURIComponent(filename)}`;

        const response = await axios.get(fileUrl, {
            responseType: 'arraybuffer',
        });

        res.set(
            'Content-Type',
            response.headers['content-type'] || 'application/octet-stream'
        );

        res.set(
            'Cache-Control',
            'public, max-age=31536000, immutable'
        );

        return res.send(response.data);

    } catch (error) {
        console.error(
            'Failed to fetch uploaded file:',
            error.response?.status || error.message
        );

        return res.status(404).json({
            success: false,
            message: 'File not found.',
        });
    }
});

app.use('/api/seo', seoRoutes);
app.use('/api/cookie-consents', cookieConsentRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/products', productRoutes);
app.use('/api/newsletter-subscribers', newsletterSubscriberRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/single-services', singleServiceRoutes);
app.use('/api/single-service-advantages', singleServiceAdvantageRoutes);
app.use('/api/service-models', serviceModelRoutes);
app.use('/api/enquire-forms', enquireFormRoutes);
app.use('/api/contact-form-entries', contactFormEntryRoutes);
app.use('/api/career-positions', careerPositionRoutes);
app.use('/api/career-forms', careerFormRoutes);
app.use('/api/csr', csrRoutes);
app.use('/api/csr-intro-images', csrIntroImageRoutes);
app.use('/api/csr-slider-images', csrSliderImageRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/process', processRoutes);
app.use('/api/contact-page', contactPageRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/about-logos', aboutLogoRoutes);
app.use('/api/about-features', aboutFeatureRoutes);
app.use('/api/services-page', servicesPageRoutes);
app.use('/api/services-strategic', servicesStrategicRoutes);
app.use('/api/services-core-projects', servicesCoreProjectRoutes);
app.use('/api/services-maintenance', servicesMaintenanceRoutes);

app.use(sitemapRoutes);

// const frontendDistPath = path.join(__dirname, '../../assipl-reactjs/dist');
// const frontendIndexPath = path.join(frontendDistPath, 'index.html');

// if (fs.existsSync(frontendIndexPath)) {
//     app.use(express.static(frontendDistPath, { index: false }));

//     app.use(async (req, res, next) => {
//         if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
//             return next();
//         }

//         if (path.extname(req.path)) {
//             return next();
//         }

//         try {
//             const siteUrl = (process.env.SITE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
//             const html = await renderIndexHtml(frontendIndexPath, req.path, siteUrl);

//             res.set('Content-Type', 'text/html');
//             return res.send(html);
//         } catch (error) {
//             return res.sendFile(frontendIndexPath);
//         }
//     });
// } else {
//     console.warn('Frontend build not found at', frontendDistPath, '- skipping static frontend serving.');
// }

module.exports = app;

