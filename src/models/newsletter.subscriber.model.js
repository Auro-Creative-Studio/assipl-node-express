module.exports = (sequelize, DataTypes) => sequelize.define(
    "NewsletterSubscriber",
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    },
    {
        tableName: "assipl_newsletter_subscribers",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
