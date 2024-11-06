const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const UserType = require('./UserType');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_of_join: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    blood_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'user',
    timestamps: true,
});

User.belongsTo(UserType, {
    foreignKey: 'user_type_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});

module.exports = User;
