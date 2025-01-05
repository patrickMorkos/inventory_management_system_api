'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('sale_type', [
            { id: 1, sale_type_name: 'Cash van' },
            { id: 2, sale_type_name: 'Presale' },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('sale_type', {
            id: [1, 2, ],
        });
    },
};
