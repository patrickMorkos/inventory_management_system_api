const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductSize = sequelize.define('ProductSize', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_size_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'product_size',
    timestamps: false,
});

module.exports = ProductSize;
