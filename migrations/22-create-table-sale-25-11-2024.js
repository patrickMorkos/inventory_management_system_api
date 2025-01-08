'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('sale', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            total_price_usd: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            total_price_lbp: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            vat_value: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            total_price_without_vat_usd: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            total_price_without_vat_lbp: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            issue_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            due_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            is_pending_payment: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            invoice_pdf_url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            sale_type_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'sale_type',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'user',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            client_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Client',
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
        await queryInterface.dropTable('sale');
    },
};
