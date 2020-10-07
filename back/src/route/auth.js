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
    // isNotLoggedIn,
    passport.authenticate('kakao'));


    router.get('/kakao/callback', passport.authenticate('kakao', {
        failureRedirect: '/', session: false
    }), (req, res)=>{
        console.log('test');
        res.redirect('/');
    })
    

module.exports = router;