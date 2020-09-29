const express = require('express');
const passport = require('passport');
const {
    register,
    localLogin,
    kakaoLogin,
    validateInputs,
    generateToken
} = require('../controller/auth');

const router = express.Router();

router.post('/register', 
    validateInputs({type: 'register'}), 
    register);

router.post('/login', 
    validateInputs({type: 'login'}), 
    localLogin
    );

router.get('/kakao', 
    passport.authenticate('kakao'));

router.get('/kakao/callback', 
    kakaoLogin, 
    );



module.exports = router;