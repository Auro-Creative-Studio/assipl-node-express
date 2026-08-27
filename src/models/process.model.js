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

    const Process = sequelize.define(
        "Process",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            // Hero section
            hero_background_image: { type: DataTypes.STRING(500), allowNull: true },
            hero_title: { type: DataTypes.STRING(255), allowNull: true },

            // Intro section
            intro_heading: { type: DataTypes.STRING(255), allowNull: true },
            intro_description: { type: DataTypes.TEXT("long"), allowNull: true },

            // Process steps timeline
            steps: jsonColumn("steps", "[]"),

            // CTA section
            cta_background_image: { type: DataTypes.STRING(500), allowNull: true },
            cta_heading: { type: DataTypes.STRING(255), allowNull: true },
            cta_description: { type: DataTypes.TEXT("long"), allowNull: true },
            cta_button_label: { type: DataTypes.STRING(255), allowNull: true },

            // Metadata / SEO
            meta_title: { type: DataTypes.STRING(255), allowNull: true },
            meta_description: { type: DataTypes.TEXT, allowNull: true },
            meta_keywords: { type: DataTypes.TEXT, allowNull: true },
            og_title: { type: DataTypes.STRING(255), allowNull: true },
            og_description: { type: DataTypes.TEXT, allowNull: true },
            og_image: { type: DataTypes.STRING(255), allowNull: true },
            image_alt_text: { type: DataTypes.STRING(255), allowNull: true },
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

            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "assipl_process",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Process;
};
