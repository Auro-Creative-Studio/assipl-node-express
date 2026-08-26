module.exports = (sequelize, DataTypes) => {
    const ServiceModel = sequelize.define(
        "ServiceModel",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            service_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },

            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            image: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

            sort_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },

            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "assipl_single_services_models",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return ServiceModel;
};
