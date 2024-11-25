const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductType = sequelize.define('ProductType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_type_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    arabic_product_type_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'product_type',
    timestamps: false,
});

module.exports = ProductType;
