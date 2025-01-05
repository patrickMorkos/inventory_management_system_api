'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('sale', 'invoice_pdf_url', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('sale', 'invoice_pdf_url', {
            type: Sequelize.STRING(255),
            allowNull: false,
        });
    }
};