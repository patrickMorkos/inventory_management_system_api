'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('client', 'commercial_register', {
            type: Sequelize.BIGINT,
            allowNull: true,
        });

        await queryInterface.changeColumn('client', 'mof_number', {
            type: Sequelize.BIGINT,
            allowNull: true,
        });

        await queryInterface.changeColumn('client', 'vat_register', {
            type: Sequelize.BIGINT,
            allowNull: true,
        });

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('client', 'commercial_register', {
            type: Sequelize.INTEGER,
            allowNull: true,
        });

        await queryInterface.changeColumn('client', 'mof_number', {
            type: Sequelize.INTEGER,
            allowNull: true,
        });

        await queryInterface.changeColumn('client', 'vat_register', {
            type: Sequelize.INTEGER,
            allowNull: true,
        });

    },
};
