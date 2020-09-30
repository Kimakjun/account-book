const express = require('express');
const {
    getPayments, 
    addPayment,
    deletePayment
} = require('../controller/payment');

const router = express.Router();

router.get('/', getPayments);
router.post('/', addPayment);
router.delete('/:id', deletePayment);


module.exports = router;