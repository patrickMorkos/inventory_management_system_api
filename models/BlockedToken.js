const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class BlockedToken extends Model { }

BlockedToken.init(
    {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'BlockedToken',
    }
);

module.exports = BlockedToken;
