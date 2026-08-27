module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            first_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            last_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            role_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "assipl_user_roles",
                    key: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
        },
        {
            tableName: "assipl_users",
            timestamps: true,
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            defaultScope: {
                attributes: {
                    exclude: ["password"],
                },
            },
            scopes: {
                withPassword: {
                    attributes: {},
                },
            },
        }
    );

    return User;
};
