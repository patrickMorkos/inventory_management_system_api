'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_description', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            product_description_1: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            product_description_2: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            arabic_product_description_2: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            french_product_description_2: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('product_description');
    },
};
