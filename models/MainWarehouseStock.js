const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const MainWarehouseStock = sequelize.define('MainWarehouseStock', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'main_warehouse_stock',
    timestamps: true,
});

MainWarehouseStock.belongsTo(Product, {
    foreignKey: 'product_id',
});

module.exports = MainWarehouseStock;
