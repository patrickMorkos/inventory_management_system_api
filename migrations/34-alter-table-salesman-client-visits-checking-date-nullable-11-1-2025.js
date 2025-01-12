'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('salesman_client_visits', 'check_in_date_time', {
            type: Sequelize.DATE,
            allowNull: true,
        });

        await queryInterface.changeColumn('salesman_client_visits', 'check_out_date_time', {
            type: Sequelize.DATE,
            allowNull: true,
        });

        await queryInterface.changeColumn('salesman_client_visits', 'id', {
            type: Sequelize.INTEGER,
            autoIncrement: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('salesman_client_visits', 'check_in_date_time', {
            type: Sequelize.DATE,
            allowNull: false,
        });

        await queryInterface.changeColumn('salesman_client_visits', 'check_out_date_time', {
            type: Sequelize.DATE,
            allowNull: false,
        });

        await queryInterface.changeColumn('salesman_client_visits', 'id', {
            type: Sequelize.INTEGER,
            autoIncrement: false,
        });
    }
};