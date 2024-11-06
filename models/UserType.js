const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserType = sequelize.define('UserType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'user_type',
    timestamps: false,
});

module.exports = UserType;
