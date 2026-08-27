module.exports = (sequelize, DataTypes) => {
    const jsonColumn = (fieldName, defaultValue) => ({
        type: DataTypes.TEXT("long"),
        allowNull: true,
        defaultValue,
        get() {
            const raw = this.getDataValue(fieldName);

            if (!raw) return JSON.parse(defaultValue);
            if (typeof raw !== "string") return raw;

            try {
                return JSON.parse(raw);
            } catch {
                return JSON.parse(defaultValue);
            }
        },
        set(value) {
            this.setDataValue(fieldName, JSON.stringify(value ?? JSON.parse(defaultValue)));
        },
    });

    const Product = sequelize.define(
        "Product",
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

            heading: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            front_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            rear_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            hero_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            main_image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            subtitle: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            capabilities: jsonColumn("capabilities", "[]"),
            use_cases: jsonColumn("use_cases", "[]"),

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

            sort_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "assipl_products",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Product;
};
