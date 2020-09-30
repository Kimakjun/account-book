const express = require('express');
const { isLoggedIn } = require('../controller/auth');
const authRouter = require('./auth');
const transactionRouter = require('./transaction');
const categoryRouter = require('./category');
// const paymentRouter = require('./payment');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/transaction', isLoggedIn, transactionRouter);
router.use('/category', isLoggedIn, categoryRouter);
// router.use('/payment', isLoggedIn, paymentRouter);

module.exports = router;