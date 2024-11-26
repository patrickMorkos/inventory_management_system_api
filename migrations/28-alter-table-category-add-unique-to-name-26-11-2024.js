'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('category', 'category_name', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('category', 'category_name', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
        });
    },
};
