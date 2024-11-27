'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('category', 'category_image_url', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('category', 'category_image_url', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};
