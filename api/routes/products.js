const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import product model
const Product = require('../models/products');

// GET requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET all products route"
    })
});

// POST requests
router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            res.status(201).json({
                message: "Product created",
                createdProduct: result
            });
        })
        .catch(error => {
            console.log(error)
        });
});

// GET Single product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "GET single product",
        id: id
    });
});

// PATCH Single product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(201).json({
        message: "Updated single product",
        id: id
    })
});

// Delete single product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "Deleted single product"
    })
})



module.exports = router;