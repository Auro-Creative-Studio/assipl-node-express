module.exports = (sequelize, DataTypes) => {
    const CareerPosition = sequelize.define(
        "CareerPosition",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },

            position_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
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
            tableName: "assipl_career_positions",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return CareerPosition;
};
