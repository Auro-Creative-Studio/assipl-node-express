module.exports = (sequelize, DataTypes) => {
    const CsrIntroImage = sequelize.define(
        "CsrIntroImage",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            csr_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },

            image: {
                type: DataTypes.STRING(500),
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
            tableName: "assipl_csr_intro_images",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return CsrIntroImage;
};
