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

module.exports = db;
