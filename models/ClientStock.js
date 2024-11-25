const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Client = require('./Client');
const Product = require('./Product');

const ClientStock = sequelize.define('ClientStock', {
    client_id: {
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
}, {
    tableName: 'client_stock',
    timestamps: true,
});

ClientStock.belongsTo(Client, {
    foreignKey: 'client_id',
});

ClientStock.belongsTo(Product, {
    foreignKey: 'product_id',
});

module.exports = ClientStock;
