module.exports = (sequelize, DataTypes) => {
    const BlogCategory = sequelize.define(
        "BlogCategory",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
        },
        {
            tableName: "royal4_blog_categories",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return BlogCategory;
};
