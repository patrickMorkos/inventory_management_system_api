const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductDescription = sequelize.define('ProductDescription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_description_1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_description_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    arabic_product_description_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    french_product_description_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'product_description',
    timestamps: false,
});

module.exports = ProductDescription;
