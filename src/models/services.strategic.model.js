module.exports = (sequelize, DataTypes) => {
    const ServicesStrategic = sequelize.define(
        "ServicesStrategic",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            service_page_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },

            icon: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            heading: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            sort_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "assipl_services_strategic",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return ServicesStrategic;
};
