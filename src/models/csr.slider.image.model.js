module.exports = (sequelize, DataTypes) => {
    const CsrSliderImage = sequelize.define(
        "CsrSliderImage",
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
            tableName: "assipl_csr_slider_images",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return CsrSliderImage;
};
