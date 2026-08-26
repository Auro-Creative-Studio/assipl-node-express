module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define(
        "Blog",
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            slug: {
                type: DataTypes.STRING(255),
                allowNull: true,
                unique: true,
            },

            featured_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            main_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            blog_image_1: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            blog_image_2: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            description_1: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            description_2: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            description_3: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT("long"),
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
                defaultValue: "index",
            },

            robots_follow: {
                type: DataTypes.ENUM("follow", "nofollow"),
                defaultValue: "follow",
            },

            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "assipl_blogs",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Blog;
};
