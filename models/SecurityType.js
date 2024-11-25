const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SecurityType = sequelize.define('SecurityType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    security_type_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'security_type',
    timestamps: false,
});

module.exports = SecurityType;