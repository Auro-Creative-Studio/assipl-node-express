module.exports = (sequelize, DataTypes) => {
    const ContactPage = sequelize.define(
        "ContactPage",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            contact_title: { type: DataTypes.STRING(255), allowNull: true },
            contact_description: { type: DataTypes.TEXT, allowNull: true },
            address: { type: DataTypes.TEXT, allowNull: true },
            map_link: { type: DataTypes.STRING(500), allowNull: true },
            map_embed_code: { type: DataTypes.TEXT, allowNull: true },
            email: { type: DataTypes.STRING(255), allowNull: true },
            phoneno: { type: DataTypes.STRING(255), allowNull: true },

            linkedin_link: { type: DataTypes.STRING(500), allowNull: true },
        },
        {
            tableName: "assipl_contact_page",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return ContactPage;
};
