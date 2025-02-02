'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('client', 'qr_code', {
            type: Sequelize.TEXT,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('client', 'qr_code', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
