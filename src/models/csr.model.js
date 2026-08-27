module.exports = (sequelize, DataTypes) => {
    const Csr = sequelize.define(
        "Csr",
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

            intro_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            intro_description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            project_title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            project_description: {
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

            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "assipl_csr",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Csr;
};
