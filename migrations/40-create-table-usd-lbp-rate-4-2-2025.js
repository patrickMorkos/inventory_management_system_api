'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('usdlbp_rate', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            rate: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
        });

        await queryInterface.bulkInsert('usdlbp_rate', [
            { rate: 89500 }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('usdlbp_rate');
    },
};
