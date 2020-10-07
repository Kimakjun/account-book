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
    logout,
    getUserData
} = require('../controller/auth');
const {asyncErrorHandler} = require('../util/error');

const router = express.Router();

router.post('/register', 
    isNotLoggedIn,
    validateInputs({type: 'register'}), 
    asyncErrorHandler(register));

router.post('/login', 
    isNotLoggedIn,
    validateInputs({type: 'login'}), 
    localLogin,
    asyncErrorHandler(generateToken)
    );

router.get('/logout',
    isLoggedIn,
    asyncErrorHandler(logout)
    )

router.get('/kakao', 
    isNotLoggedIn,
    passport.authenticate('kakao'));

router.get('/kakao/callback', 
    kakaoLogin, 
    asyncErrorHandler(generateToken)
    );

router.get('/userData',
    isLoggedIn,
    asyncErrorHandler(getUserData)   
);


module.exports = router;