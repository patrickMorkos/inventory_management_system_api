const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Client = require('./Client');

const SalesmanClientVisits = sequelize.define('SalesmanClientVisits', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    check_in_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    check_out_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'salesman_client_visits',
    timestamps: false,
});

SalesmanClientVisits.belongsTo(User, {
    foreignKey: 'user_id',
});

SalesmanClientVisits.belongsTo(Client, {
    foreignKey: 'client_id',
});

module.exports = SalesmanClientVisits;
