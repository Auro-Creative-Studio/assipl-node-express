module.exports = (sequelize, DataTypes) => {
    const ContactFormEntry = sequelize.define(
        "ContactFormEntry",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },

            full_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            phone_number: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            subject: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "assipl_contact_form",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return ContactFormEntry;
};
