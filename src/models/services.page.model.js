module.exports = (sequelize, DataTypes) => {
    const ServicesPage = sequelize.define(
        "ServicesPage",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            banner_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            services_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            services_description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            strategic_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            strategic_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            core_project_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            core_project_description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            maintenance_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            learn_more_link: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            know_more_link: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            read_more_link: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            meta_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            meta_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            meta_keywords: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            og_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            og_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            og_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            image_alt_text: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            robots_index: {
                type: DataTypes.ENUM("index", "noindex"),
                allowNull: false,
                defaultValue: "index",
            },

            robots_follow: {
                type: DataTypes.ENUM("follow", "nofollow"),
                allowNull: false,
                defaultValue: "follow",
            },

            published: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "assipl_services",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return ServicesPage;
};
