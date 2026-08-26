module.exports = (sequelize, DataTypes) => {
    const Seo = sequelize.define(
        "Seo",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            page_type: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },

            meta_title: {
                type: DataTypes.STRING(255),
                allowNull: false,
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

            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "assipl_seo",

            timestamps: true,

            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Seo;
};