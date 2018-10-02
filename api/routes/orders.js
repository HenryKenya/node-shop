const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');

// GET all orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET all orders"
    })
});

router.post('/', (req, res, next) => {

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });

    order.save()
         .then(result => {
            res.status(201).json({
                message: "Order created",
                createdOrder: result
            })
         })
         .catch(err => {
            res.status(500).json({
                error: err
            })
         })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    res.status(200).json({
        message: "GET single order"
    })
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order deleted"
    })
});

module.exports = router;