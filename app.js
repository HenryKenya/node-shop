const express = require('express');

const app = express();

// Routes
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Middleware to handle requests: Define API end points
app.use('/products', productRoutes);

app.use('/orders', ordersRoutes)

module.exports = app;