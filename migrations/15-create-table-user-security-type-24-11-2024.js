'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user_security_type', {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            security_type_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            security_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'security_type',
                    key: 'id',
                },
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user_security_type');
    },
};
