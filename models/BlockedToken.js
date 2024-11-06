const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BlockedToken = sequelize.define('BlockedToken', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'blocked_tokens',
    timestamps: true,
});

module.exports = BlockedToken;
