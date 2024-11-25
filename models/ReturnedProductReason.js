const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ReturnedProductReason = sequelize.define('ReturnedProductReason', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'returned_product_reason',
    timestamps: false,
});

module.exports = ReturnedProductReason;
