const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductPrice = sequelize.define('ProductPrice', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    pricea1: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    pricea2: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    priceb1: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    priceb2: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    pricec1: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    pricec2: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    priced1: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    priced2: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
}, {
    tableName: 'product_price',
    timestamps: false,
});

module.exports = ProductPrice;
