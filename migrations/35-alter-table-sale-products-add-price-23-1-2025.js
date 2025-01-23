'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('sale_products', 'product_price', {
            type: Sequelize.DOUBLE,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('sale_products', 'product_price');
    }
};
