'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user_type', [
            { id: 1, user_type_name: 'Admin' },
            { id: 2, user_type_name: 'Cash Van Salesman' },
            { id: 3, user_type_name: 'Merchandise Salesman' },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_type', {
            id: [1, 2, 3],
        });
    },
};
