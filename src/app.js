const express = require('express');
const cors = require('cors');
const path = require('path');

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
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
module.exports = app;

