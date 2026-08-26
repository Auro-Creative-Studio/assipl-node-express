const express = require('express');
const cors = require('cors');

const seoRoutes = require('./routes/seo.routes');
const cookieConsentRoutes = require('./routes/cookie.consent.routes');
const contactRoutes = require('./routes/contact.form.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const blogRoutes = require('./routes/blog.routes');
const blogCategoryRoutes = require('./routes/blog.category.routes');
const blogHubRoutes = require('./routes/blog.hub.routes');
const newsletterSubscriberRoutes = require('./routes/newsletter.subscriber.routes');
const userRoutes = require('./routes/user.routes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/seo', seoRoutes);
app.use('/api/cookie-consents', cookieConsentRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blog-categories', blogCategoryRoutes);
app.use('/api/blog-hubs', blogHubRoutes);
app.use('/api/newsletter-subscribers', newsletterSubscriberRoutes);
app.use('/api/users', userRoutes);
module.exports = app;

