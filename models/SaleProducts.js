const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Sale = require('./Sale');
const Product = require('./Product');

const SaleProducts = sequelize.define('SaleProducts', {
    sale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
}, {
    tableName: 'sale_products',
    timestamps: true,
});

SaleProducts.belongsTo(Sale, {
    foreignKey: 'sale_id',
});

SaleProducts.belongsTo(Product, {
    foreignKey: 'product_id',
});

module.exports = SaleProducts;
