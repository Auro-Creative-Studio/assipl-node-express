module.exports = (sequelize, DataTypes) => {
    const AboutFeature = sequelize.define(
        "AboutFeature",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            about_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },

            logo: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            sort_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "assipl_about_features",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return AboutFeature;
};
