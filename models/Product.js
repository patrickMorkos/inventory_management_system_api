const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Brand = require('./Brand');
const Category = require('./Category');
const ProductType = require('./ProductType');
const Whs = require('./Whs');
const ProductDescription = require('./ProductDescription');
const ProductPrice = require('./ProductPrice');
const ProductFamily = require('./ProductFamily');
const ProductSize = require('./ProductSize');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    cod: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
    },
    barcod: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    hscod: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    arabic_unit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pack: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    unit_per_pack: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    weight: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    gross_weight: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    net_weight: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    forme: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    arabic_forme: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_taxable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    raw: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    p_raw: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    p_raw_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    width: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    height: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    length: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    pltheight: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pltbase: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pltload: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cntload: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    package_size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    packaging: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    whs_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_description_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_price_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_family_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_size_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Product',
    timestamps: true,
});

Product.belongsTo(Brand, {
    foreignKey: 'brand_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Product.belongsTo(Category, {
    foreignKey: 'category_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Product.belongsTo(ProductType, {
    foreignKey: 'product_type_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Product.belongsTo(Whs, {
    foreignKey: 'whs_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Product.belongsTo(ProductDescription, {
    foreignKey: 'product_description_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Product.belongsTo(ProductPrice, {
    foreignKey: 'product_price_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Product.belongsTo(ProductFamily, {
    foreignKey: 'product_family_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Product.belongsTo(ProductSize, {
    foreignKey: 'product_size_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});

module.exports = Product;
