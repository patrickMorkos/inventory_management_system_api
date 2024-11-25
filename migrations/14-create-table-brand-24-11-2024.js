'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('brand', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            brand_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            arabic_brand_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('brand');
    },
};
