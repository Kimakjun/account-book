const express = require('express');
const { isLoggedIn } = require('../controller/auth');
const authRouter = require('./auth');
const transactionRouter = require('./transaction');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/transaction', isLoggedIn, transactionRouter);

module.exports = router;