const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// Routes
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// mongoose connect to database
mongoose.connect(`mongodb+srv://node-shop:${process.env.MONGO_ATLAS_PW}@node-shop-jqwtd.mongodb.net/test?retryWrites=true`, {
    useMongoClient: true
});

// Logging using morgan
app.use(morgan('dev'));

// Parsing data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, AUthorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({})
    };
    next();
})


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