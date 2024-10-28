const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db')
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();