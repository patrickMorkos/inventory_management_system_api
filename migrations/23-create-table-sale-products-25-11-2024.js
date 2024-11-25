'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('sale_products', {
            sale_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            product_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sale_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'sale',
                    key: 'id',
                },
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'product',
                    key: 'id',
                },
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
        await queryInterface.dropTable('sale_products');
    },
};
