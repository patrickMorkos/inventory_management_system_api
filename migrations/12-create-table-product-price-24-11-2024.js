'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_price', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            pricea1: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            pricea2: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            priceb1: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            priceb2: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            pricec1: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            pricec2: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            priced1: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            priced2: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('product_price');
    },
};
