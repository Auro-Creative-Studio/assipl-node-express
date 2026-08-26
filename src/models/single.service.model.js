module.exports = (sequelize, DataTypes) => {
    const SingleService = sequelize.define(
        "SingleService",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            slug: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },

            banner_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            banner_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            breadcrumb_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            featured_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            overview_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            overview_description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            service_advantages_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            service_advantages_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            service_models_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            service_models_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            cta_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            cta_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            cta_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "assipl_single_service",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return SingleService;
};
