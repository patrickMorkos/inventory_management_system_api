const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const productType = require('./routes/productTypeRoutes');
const whsRoutes = require('./routes/whsRoutes');
const productDescriptionRoutes = require('./routes/productDescriptionRoutes');
const productPriceRoutes = require('./routes/productPriceRoutes');
const productFamilyRoutes = require('./routes/productFamilyRoutes');
const productSizeRoutes = require('./routes/productSizeRoutes');
const product = require('./routes/productRoutes');
const mainWarehouseStockRoutes = require('./routes/mainWarehouseStockRoutes');
const sequelize = require('./config/db')
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/product-type', productType);
app.use('/api/whs', whsRoutes);
app.use('/api/product-description', productDescriptionRoutes);
app.use('/api/product-price', productPriceRoutes);
app.use('/api/product-family', productFamilyRoutes);
app.use('/api/product-size', productSizeRoutes);
app.use('/api/product', product);
app.use('/api/main-warehouse-stock', mainWarehouseStockRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();