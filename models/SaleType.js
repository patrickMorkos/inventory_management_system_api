const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SaleType = sequelize.define('SaleType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    sale_type_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'sale_type',
    timestamps: false,
});

module.exports = SaleType;
