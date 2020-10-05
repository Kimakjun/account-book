const express = require('express');
const { validateInputs } = require('../controller/auth');
const {getTransaction,
       getTransactionByCategory,
       getTransactionByExpenditure,
       addTransaction,
       updateTransaction,
       deleteTransaction
        } = require('../controller/transaction');
const {asyncErrorHandler} = require('../util/error');

const router = express.Router();

// TODO: UPDATE, CREATE 유효성 검증
router.get('/:date', asyncErrorHandler(getTransaction));
router.get('/:date/category', asyncErrorHandler(getTransactionByCategory));
router.get('/:date/expenditure', asyncErrorHandler(getTransactionByExpenditure));
router.post('/', asyncErrorHandler(addTransaction));
router.put('/:id', asyncErrorHandler(updateTransaction));
router.delete('/:id', asyncErrorHandler(deleteTransaction));


module.exports = router;