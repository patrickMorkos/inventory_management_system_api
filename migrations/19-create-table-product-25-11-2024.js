'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            cod: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: true,
            },
            barcod: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: true,
            },
            hscod: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            unit: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            arabic_unit: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            pack: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            unit_per_pack: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            weight: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            gross_weight: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            net_weight: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            forme: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            arabic_forme: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_taxable: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            raw: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            p_raw: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            p_raw_description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            width: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            height: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            length: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            pltheight: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            pltbase: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            pltload: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            cntload: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            package_size: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            packaging: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            image_url: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            brand_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'brand',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            product_type_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'product_type',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            whs_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'whs',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            product_description_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'product_description',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            product_price_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'product_price',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            product_family_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'product_family',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            product_size_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'product_size',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('product');
    },
};
