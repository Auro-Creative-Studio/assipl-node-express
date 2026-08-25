const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const db = {};

db.sequelize = sequelize;
db.Seo = require('./seo.model')(sequelize, DataTypes);
db.CookieConsent = require('./cookie.consent.model')(sequelize, DataTypes);
db.Contact = require('./contact.form.model')(sequelize, DataTypes);
db.Enquiry = require('./enquiry.model')(sequelize, DataTypes);
db.User = require('./user.model')(sequelize, DataTypes);
db.BlogCategory = require('./blog.category.model')(sequelize, DataTypes);
db.Blog = require('./blog.model')(sequelize, DataTypes);
db.BlogHub = require('./blog.hub.model')(sequelize, DataTypes);
db.NewsletterSubscriber = require('./newsletter.subscriber.model')(sequelize, DataTypes);

db.Blog.belongsTo(db.BlogCategory, {
    foreignKey: "category_id",
    as: "category",
});

db.BlogCategory.hasMany(db.Blog, {
    foreignKey: "category_id",
    as: "blogs",
});

db.BlogHub.belongsTo(db.BlogCategory, {
    foreignKey: "category_id",
    as: "category",
});

db.BlogCategory.hasMany(db.BlogHub, {
    foreignKey: "category_id",
    as: "blog_hubs",
});

module.exports = db;
