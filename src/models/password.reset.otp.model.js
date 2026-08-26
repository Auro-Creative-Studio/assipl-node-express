module.exports = (sequelize, DataTypes) => {
    const PasswordResetOtp = sequelize.define(
        "PasswordResetOtp",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "assipl_users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },

            otp_hash: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            purpose: {
                type: DataTypes.ENUM("forgot_password", "profile_password_reset"),
                allowNull: false,
            },

            expires_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            used_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            tableName: "assipl_password_reset_otps",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            indexes: [
                {
                    name: "idx_assipl_password_reset_otps_user_purpose",
                    fields: ["user_id", "purpose"],
                },
            ],
        }
    );

    return PasswordResetOtp;
};
