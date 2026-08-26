const express = require('express');
const cors = require('cors');
const path = require('path');

const seoRoutes = require('./routes/seo.routes');
const cookieConsentRoutes = require('./routes/cookie.consent.routes');
const contactRoutes = require('./routes/contact.form.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const blogRoutes = require('./routes/blog.routes');
const newsletterSubscriberRoutes = require('./routes/newsletter.subscriber.routes');
const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/seo', seoRoutes);
app.use('/api/cookie-consents', cookieConsentRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter-subscribers', newsletterSubscriberRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);
module.exports = app;

