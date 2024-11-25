const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SaleType = require('./SaleType');
const User = require('./User');
const Client = require('./Client');

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    total_price_usd: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    total_price_lbp: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    vat_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    total_price_without_vat_usd: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    total_price_without_vat_lbp: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    issue_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_pending_payment: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    invoice_pdf_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sale_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'sale',
    timestamps: true,
});

Sale.belongsTo(SaleType, {
    foreignKey: 'sale_type_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Sale.belongsTo(User, {
    foreignKey: 'user_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Sale.belongsTo(Client, {
    foreignKey: 'client_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});

module.exports = Sale;
