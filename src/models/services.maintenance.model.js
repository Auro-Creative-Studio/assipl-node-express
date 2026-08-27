module.exports = (sequelize, DataTypes) => {
    const ServicesMaintenance = sequelize.define(
        "ServicesMaintenance",
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

            image: {
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
            tableName: "assipl_services_maintenance",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return ServicesMaintenance;
};
