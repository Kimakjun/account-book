const express = require('express');
const passport = require('passport');
const {
    register,
    localLogin,
    kakaoLogin,
    validateInputs,
    generateToken,
    isNotLoggedIn,
    isLoggedIn,
    logout
} = require('../controller/auth');

const router = express.Router();

router.post('/register', 
    isNotLoggedIn,
    validateInputs({type: 'register'}), 
    register);

router.post('/login', 
    isNotLoggedIn,
    validateInputs({type: 'login'}), 
    localLogin,
    generateToken
    );

router.get('/logout',
    isLoggedIn,
    logout
    )

router.get('/kakao', 
    isNotLoggedIn,
    passport.authenticate('kakao'));

router.get('/kakao/callback', 
    kakaoLogin, 
    generateToken
    );



module.exports = router;