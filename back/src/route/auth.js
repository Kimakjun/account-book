const express = require('express');
const passport = require('passport');
const {
    register,
    kakaoLogin,
    kakaoCallBack
} = require('../controller/auth');

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/', }), kakaoCallBack);



module.exports = router;