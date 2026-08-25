module.exports = (sequelize, DataTypes) => {
    const Enquiry = sequelize.define(
        "Enquiry",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            mobile_number: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            service_needed: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            budget_rs: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },

            company_brief: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "royal4_enquiry",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Enquiry;
};