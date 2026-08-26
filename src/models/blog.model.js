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

            excerpt: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            featured_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            hero_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            content_blocks: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                defaultValue: "[]",
                get() {
                    const raw = this.getDataValue("content_blocks");

                    if (!raw) return [];
                    if (typeof raw !== "string") return raw;

                    try {
                        return JSON.parse(raw);
                    } catch {
                        return [];
                    }
                },
                set(value) {
                    this.setDataValue("content_blocks", JSON.stringify(value ?? []));
                },
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
