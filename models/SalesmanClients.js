const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Client = require('./Client');

const SalesmanClients = sequelize.define('SalesmanClients', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
}, {
    tableName: 'salesman_clients',
    timestamps: false,
});

SalesmanClients.belongsTo(User, {
    foreignKey: 'user_id',
});

SalesmanClients.belongsTo(Client, {
    foreignKey: 'client_id',
});

module.exports = SalesmanClients;
