'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('client', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            qr_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            company_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            commercial_register: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            izaa_tijariye_pdf_url: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            photocopy_id_card_url: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            mof_number: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            vat_register: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            location_area_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'location_area',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('client');
    },
};
