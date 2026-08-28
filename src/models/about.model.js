module.exports = (sequelize, DataTypes) => {
    const About = sequelize.define(
        "About",
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

            banner_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            banner_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            about_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            about_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            about_description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            download_brochure: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            manufacture_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            securing_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            securing_description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            securing_image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            securing_image_2: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            securing_image_3: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            future_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            future_description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            future_image: {
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
            tableName: "assipl_about",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return About;
};
