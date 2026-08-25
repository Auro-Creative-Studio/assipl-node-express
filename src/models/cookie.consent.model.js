module.exports = (sequelize, DataTypes) => {
    const CookieConsent = sequelize.define(
        'CookieConsent',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },

            session_id: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            ip_address: {
                type: DataTypes.STRING(45),
                allowNull: true,
            },

            country: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            city: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            consent_timestamp: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            consent_type: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },

            latitude: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            longitude: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            device: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            language: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            timezone: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            tableName: 'royal4_cookie_consents',

            timestamps: true,

            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return CookieConsent;
};