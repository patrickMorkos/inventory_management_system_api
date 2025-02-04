const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UsdLbpRate = sequelize.define('UsdLbpRate', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    rate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    tableName: 'usdlbp_rate',
    timestamps: false,
});

module.exports = UsdLbpRate;
