const express = require('express');
const authRouter = require('./auth');
const {isLoggedIn} = require('../controller/auth');

const router = express.Router();

router.use('/auth', authRouter);
router.get('/', isLoggedIn, (req, res, next) => {
    console.log(req.user);
})

module.exports = router;