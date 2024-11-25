const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const SecurityType = require('./SecurityType');

const UserSecurityType = sequelize.define('UserSecurityType', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    security_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
}, {
    tableName: 'user_security_type',
    timestamps: false,
});

UserSecurityType.belongsTo(User, {
    foreignKey: 'user_id',
});

UserSecurityType.belongsTo(SecurityType, {
    foreignKey: 'security_type_id',
});

module.exports = UserSecurityType;
