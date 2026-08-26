module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(
        "UserRole",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            description: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            type: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            tableName: "assipl_user_roles",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return UserRole;
};
