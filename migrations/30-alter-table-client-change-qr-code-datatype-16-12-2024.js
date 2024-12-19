'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('client', 'qr_code_UNIQUE');

        await queryInterface.changeColumn('client', 'qr_code', {
            type: Sequelize.TEXT('long'),
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('client', {
            fields: ['qr_code'],
            type: 'unique',
            name: 'qr_code_UNIQUE'
        });

        await queryInterface.changeColumn('client', 'qr_code', {
            type: Sequelize.STRING(255),
            allowNull: false,
        });
    }
};
