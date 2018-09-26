const express = require('express');

const app = express();

const morgan = require('morgan');

// Routes
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Logging using morgan
app.use(morgan('dev'))

// Middleware to handle requests: Define API end points
app.use('/products', productRoutes);

app.use('/orders', ordersRoutes)

module.exports = app;