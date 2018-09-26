const express = require('express');
const router = express.Router();

// GET all orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET all orders"
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "POST to orders"
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