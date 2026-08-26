module.exports = (sequelize, DataTypes) => {
    const CareerForm = sequelize.define(
        "CareerForm",
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

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            phone_number: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            position_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            upload_resume: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
        },
        {
            tableName: "assipl_career_form",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return CareerForm;
};
