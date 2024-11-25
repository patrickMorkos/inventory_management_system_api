const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Whs = sequelize.define('Whs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    whs_description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'whs',
    timestamps: false,
});

module.exports = Whs;
