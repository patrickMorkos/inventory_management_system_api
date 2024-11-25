const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductFamily = sequelize.define('ProductFamily', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_family_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'product_family',
    timestamps: false,
});

module.exports = ProductFamily;
