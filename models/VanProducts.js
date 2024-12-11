const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const VanProducts = sequelize.define('VanProducts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'van_products',
    timestamps: true,
});

VanProducts.belongsTo(User, {
    foreignKey: 'user_id',
});

VanProducts.belongsTo(Product, {
    foreignKey: 'product_id',
});

module.exports = VanProducts;
