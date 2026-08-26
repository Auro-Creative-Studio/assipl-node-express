module.exports = (sequelize, DataTypes) => {
    const EnquireForm = sequelize.define(
        "EnquireForm",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            company_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            contact_number: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "assipl_enquire_form",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return EnquireForm;
};
