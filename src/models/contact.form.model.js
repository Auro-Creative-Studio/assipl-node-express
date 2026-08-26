module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
        "Contact",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            first_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            last_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            subject: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            mobile_number: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },

            terms_accepted: {
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "assipl_contact",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Contact;
};
