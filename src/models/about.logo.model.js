module.exports = (sequelize, DataTypes) => {
    const AboutLogo = sequelize.define(
        "AboutLogo",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            about_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },

            logo: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },

            sort_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "assipl_about_logos",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return AboutLogo;
};
