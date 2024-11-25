const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LocationArea = require('./LocationArea');

const Client = sequelize.define('Client', {
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qr_code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    commercial_register: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    izaa_tijariye_pdf_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    photocopy_id_card_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mof_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    vat_register: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    location_area_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'client',
    timestamps: true,
});

Client.belongsTo(LocationArea, {
    foreignKey: 'location_area_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});

module.exports = Client;
