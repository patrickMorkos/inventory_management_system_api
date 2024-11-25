const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    brand_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    arabic_brand_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'brand',
    timestamps: false,
});

module.exports = Brand;
