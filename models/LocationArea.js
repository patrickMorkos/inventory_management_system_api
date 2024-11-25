const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LocationArea = sequelize.define('LocationArea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    location_area_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'location_area',
    timestamps: false,
});

module.exports = LocationArea;
