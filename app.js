const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser')

// Routes
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Logging using morgan
app.use(morgan('dev'))

// Middleware to handle requests: Define API end points
app.use('/products', productRoutes);

app.use('/orders', ordersRoutes)

// Non-existing routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Handling errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;