const express = require('express');
const passport = require('passport');
const {
    register,
    kakaoLogin,
    kakaoCallBack,
    validateInputs
} = require('../controller/auth');

const router = express.Router();

router.post('/register', validateInputs({type: 'register'}), register);

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/', }), kakaoCallBack);



module.exports = router;