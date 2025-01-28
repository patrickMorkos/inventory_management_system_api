const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');
const Client = require('./Client');
const User = require('./User');
const ReturnedProductReason = require('./ReturnedProductReason');

const ReturnedProducts = sequelize.define('ReturnedProducts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    returned_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    returned_product_reason_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'returned_products',
    timestamps: true,
});

ReturnedProducts.belongsTo(Product, {
    foreignKey: 'product_id',
});
ReturnedProducts.belongsTo(Client, {
    foreignKey: 'client_id',
});
ReturnedProducts.belongsTo(User, {
    foreignKey: 'user_id',
});
ReturnedProducts.belongsTo(ReturnedProductReason, {
    foreignKey: 'returned_product_reason_id',
});

module.exports = ReturnedProducts;
