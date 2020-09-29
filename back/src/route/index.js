const express = require('express');
const authRouter = require('./auth');

const router = express.Router();

router.use('/auth', authRouter);
router.get('/', (req, res, next) => {
    console.log(req.user);
})

module.exports = router;