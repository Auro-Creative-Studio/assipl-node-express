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

    const Home = sequelize.define(
        "Home",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            // Hero section
            hero_background_image: { type: DataTypes.STRING(500), allowNull: true },
            hero_title_line1: { type: DataTypes.STRING(255), allowNull: true },
            hero_title_line2: { type: DataTypes.STRING(255), allowNull: true },
            hero_subtitle: { type: DataTypes.TEXT, allowNull: true },
            hero_stats: jsonColumn("hero_stats", "[]"),
            hero_cta_label: { type: DataTypes.STRING(255), allowNull: true },

            // Partners strip
            partners_heading: { type: DataTypes.STRING(255), allowNull: true },
            partners_logos: jsonColumn("partners_logos", "[]"),

            // About section
            about_image: { type: DataTypes.STRING(500), allowNull: true },
            about_heading: { type: DataTypes.STRING(255), allowNull: true },
            about_description: { type: DataTypes.TEXT("long"), allowNull: true },
            about_cta_label: { type: DataTypes.STRING(255), allowNull: true },
            about_cta_href: { type: DataTypes.STRING(500), allowNull: true },

            // Video section
            video_url: { type: DataTypes.STRING(500), allowNull: true },

            // Clients / testimonials section
            clients_heading: { type: DataTypes.STRING(255), allowNull: true },
            testimonials: jsonColumn("testimonials", "[]"),
            client_logos: jsonColumn("client_logos", "[]"),

            // Services section
            services_heading: { type: DataTypes.STRING(255), allowNull: true },
            services_description: { type: DataTypes.TEXT("long"), allowNull: true },
            services_image: { type: DataTypes.STRING(500), allowNull: true },
            services: jsonColumn("services", "[]"),
            services_cta_label: { type: DataTypes.STRING(255), allowNull: true },
            services_cta_href: { type: DataTypes.STRING(500), allowNull: true },

            // Nationwide section
            nationwide_heading: { type: DataTypes.STRING(255), allowNull: true },
            nationwide_description: { type: DataTypes.TEXT("long"), allowNull: true },
            locations: jsonColumn("locations", "[]"),

            // Infrastructure audit CTA section
            audit_heading: { type: DataTypes.STRING(255), allowNull: true },
            audit_description: { type: DataTypes.TEXT("long"), allowNull: true },
            audit_background_image: { type: DataTypes.STRING(500), allowNull: true },

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
            tableName: "assipl_home",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Home;
};
