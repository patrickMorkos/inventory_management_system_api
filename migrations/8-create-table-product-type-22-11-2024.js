'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_type', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            product_type_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            arabic_product_type_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('product_type');
    },
};
