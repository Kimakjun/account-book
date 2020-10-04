const express = require('express');
const {
    getPayments, 
    addPayment,
    deletePayment
} = require('../controller/payment');
const {asyncErrorHandler} = require('../util/error');

const router = express.Router();

router.get('/', asyncErrorHandler(getPayments));
router.post('/', asyncErrorHandler(addPayment));
router.delete('/:id', asyncErrorHandler(deletePayment));


module.exports = router;