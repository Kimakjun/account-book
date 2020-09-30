const {User} = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {isEmail, isPassword, isNick} = require('../util/validator');
require('dotenv').config();

const TOKEN_NAME = 'token';

const TOKEN_CONFIG = {
    httpOnly: true,
    samesite: 'none',
    secure: false,
    maxAge : 1000 * 60 * 60 * 24 * 7,
}

exports.register = async (req, res, next) => {
    try{
        const {email, password, nick} = req.body;
        const checkUser = await User.findOne({where: {email}});
        if(checkUser) return next(createError(400, 'already Existed'));
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            password: hash,
            nick
        });
        res.status(200).json({success: true, message: 'register success'});

    }catch(err){
        console.error(err);
        next(createError(500, 'server Error'));
    }

}

exports.localLogin = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) return next(authError);
        if(!user) return res.json({success: false, message: info.message});
        req.locals = {user};
        next();
    })(req, res, next);
}

exports.kakaoLogin = async (req, res, next) => {
    passport.authenticate('kakao', {session: false, failureRedirect: '/'}, (err, user) => {
        if(err) return next(createError(500, err));
        req.locals = {user};
        next();
    })(req, res, next);
}

exports.logout = (req, res, next) => {
    
    res.clearCookie(TOKEN_NAME, TOKEN_CONFIG);
    res.status(200).json({success: true, message: 'logout success'});

}

exports.generateToken = (req, res, next) => {
    const {user} = req.locals;
    const secretKey = process.env.JWT_SECRET;

    const payLoad = {
        id: user.id,
        email: user.email,
        nick : user.nick,
    }

    const token = jwt.sign(payLoad, secretKey);
    res.cookie(TOKEN_NAME, token, TOKEN_CONFIG);
    res.json({success: true, message: 'create jwt'});

}


exports.validateInputs = ({type}) => {
    const checkType = type;
    return (req, res, next)=>{
        const {email, nick, password} = req.body;
        if(checkType === 'register' && isEmail(email) && isPassword(password) && isNick(nick)) return next();
        if(checkType === 'login' && isEmail(email) && isPassword(password)) return next(); 
        return next(createError(400, 'invalid inputs'))
    }
}


exports.isLoggedIn = async(req, res, next) => {
   const token = req.cookies[TOKEN_NAME];
   const secretKey = process.env.JWT_SECRET;
   if(!token) return res.json({success: false, message: 'login required'});
   const getPayload = ()=>{
       return new Promise((resolve, reject) => {
           jwt.verify(token, secretKey, (err, decoded) => {
               if(err) return next(createError(500, 'invaild token'));
               resolve(decoded);
           })
       })
   }
   const payload = await getPayload();
   req.user = payload;
   next();
}

exports.isNotLoggedIn = async(req, res, next) => {
    const token = req.cookies[TOKEN_NAME];
    if(token) return res.json({success: false, message: 'logout required'});
    return next();
}