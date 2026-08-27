const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const db = {};

db.sequelize = sequelize;
db.Seo = require('./seo.model')(sequelize, DataTypes);
db.CookieConsent = require('./cookie.consent.model')(sequelize, DataTypes);
db.Contact = require('./contact.form.model')(sequelize, DataTypes);
db.Enquiry = require('./enquiry.model')(sequelize, DataTypes);
db.User = require('./user.model')(sequelize, DataTypes);
db.UserRole = require('./user.role.model')(sequelize, DataTypes);
db.PasswordResetOtp = require('./password.reset.otp.model')(sequelize, DataTypes);
db.Blog = require('./blog.model')(sequelize, DataTypes);
db.Product = require('./product.model')(sequelize, DataTypes);
db.NewsletterSubscriber = require('./newsletter.subscriber.model')(sequelize, DataTypes);
db.SingleService = require('./single.service.model')(sequelize, DataTypes);
db.SingleServiceAdvantage = require('./single.service.advantage.model')(sequelize, DataTypes);
db.ServiceModel = require('./service.model.model')(sequelize, DataTypes);
db.ServiceFeature = require('./service.feature.model')(sequelize, DataTypes);
db.EnquireForm = require('./enquire.form.model')(sequelize, DataTypes);
db.ContactFormEntry = require('./contact.form.entry.model')(sequelize, DataTypes);
db.CareerPosition = require('./career.position.model')(sequelize, DataTypes);
db.CareerForm = require('./career.form.model')(sequelize, DataTypes);
db.Csr = require('./csr.model')(sequelize, DataTypes);
db.CsrIntroImage = require('./csr.intro.image.model')(sequelize, DataTypes);
db.CsrSliderImage = require('./csr.slider.image.model')(sequelize, DataTypes);
db.About = require('./about.model')(sequelize, DataTypes);
db.AboutLogo = require('./about.logo.model')(sequelize, DataTypes);
db.AboutFeature = require('./about.feature.model')(sequelize, DataTypes);
db.ServicesPage = require('./services.page.model')(sequelize, DataTypes);
db.ServicesStrategic = require('./services.strategic.model')(sequelize, DataTypes);
db.ServicesCoreProject = require('./services.core.project.model')(sequelize, DataTypes);
db.ServicesMaintenance = require('./services.maintenance.model')(sequelize, DataTypes);

db.User.belongsTo(db.UserRole, {
    foreignKey: "role_id",
    as: "role",
});

db.UserRole.hasMany(db.User, {
    foreignKey: "role_id",
    as: "users",
});

db.User.hasMany(db.PasswordResetOtp, {
    foreignKey: "user_id",
    as: "password_reset_otps",
});

db.PasswordResetOtp.belongsTo(db.User, {
    foreignKey: "user_id",
    as: "user",
});

db.SingleService.hasMany(db.SingleServiceAdvantage, {
    foreignKey: "service_id",
    as: "advantages",
    onDelete: "CASCADE",
});

db.SingleServiceAdvantage.belongsTo(db.SingleService, {
    foreignKey: "service_id",
    as: "service",
});

db.SingleService.hasMany(db.ServiceModel, {
    foreignKey: "service_id",
    as: "models",
    onDelete: "CASCADE",
});

db.ServiceModel.belongsTo(db.SingleService, {
    foreignKey: "service_id",
    as: "service",
});

db.SingleService.hasMany(db.ServiceFeature, {
    foreignKey: "service_id",
    as: "features",
    onDelete: "CASCADE",
});

db.ServiceFeature.belongsTo(db.SingleService, {
    foreignKey: "service_id",
    as: "service",
});

db.CareerPosition.hasMany(db.CareerForm, {
    foreignKey: "position_id",
    as: "applications",
});

db.CareerForm.belongsTo(db.CareerPosition, {
    foreignKey: "position_id",
    as: "position",
});

db.Csr.hasMany(db.CsrIntroImage, {
    foreignKey: "csr_id",
    as: "intro_images",
    onDelete: "CASCADE",
});

db.CsrIntroImage.belongsTo(db.Csr, {
    foreignKey: "csr_id",
    as: "csr",
});

db.Csr.hasMany(db.CsrSliderImage, {
    foreignKey: "csr_id",
    as: "slider_images",
    onDelete: "CASCADE",
});

db.CsrSliderImage.belongsTo(db.Csr, {
    foreignKey: "csr_id",
    as: "csr",
});

db.About.hasMany(db.AboutLogo, {
    foreignKey: "about_id",
    as: "logos",
    onDelete: "CASCADE",
});

db.AboutLogo.belongsTo(db.About, {
    foreignKey: "about_id",
    as: "about",
});

db.About.hasMany(db.AboutFeature, {
    foreignKey: "about_id",
    as: "features",
    onDelete: "CASCADE",
});

db.AboutFeature.belongsTo(db.About, {
    foreignKey: "about_id",
    as: "about",
});

db.ServicesPage.hasMany(db.ServicesStrategic, {
    foreignKey: "service_page_id",
    as: "strategic_items",
    onDelete: "CASCADE",
});

db.ServicesStrategic.belongsTo(db.ServicesPage, {
    foreignKey: "service_page_id",
    as: "service_page",
});

db.ServicesPage.hasMany(db.ServicesCoreProject, {
    foreignKey: "service_page_id",
    as: "core_projects",
    onDelete: "CASCADE",
});

db.ServicesCoreProject.belongsTo(db.ServicesPage, {
    foreignKey: "service_page_id",
    as: "service_page",
});

db.ServicesPage.hasMany(db.ServicesMaintenance, {
    foreignKey: "service_page_id",
    as: "maintenance_items",
    onDelete: "CASCADE",
});

db.ServicesMaintenance.belongsTo(db.ServicesPage, {
    foreignKey: "service_page_id",
    as: "service_page",
});

module.exports = db;
