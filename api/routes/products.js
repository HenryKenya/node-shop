const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import product model
const Product = require('../models/products');

// GET requests
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(result => {
            res.status(200).json({
                products: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
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
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// GET Single product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            res.status(200).json({
                product: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// PATCH Single product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOperations = {};

    for (const ops of req.body){
        updateOperations[ops.propName]  = ops.value;
    }

    Product.update({ _id: id }, { $set: updateOperations } )
    .exec()
    .then(result => {
        res.status(200).json({
            updatedObject: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

// Delete single product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Product deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});



module.exports = router;