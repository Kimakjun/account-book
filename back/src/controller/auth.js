const {User, Category} = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {isEmail, isPassword, isNick} = require('../util/validator');
require('dotenv').config();

const TOKEN_NAME = 'token';

const TOKEN_CONFIG = { 
    httpOnly: true,  // 브라우저 쿠키접근
    samesite: 'none', // 제 3 도메인 쿠키 접근
    secure: false, // https 쿠키 설정
    maxAge : 1000 * 60 * 60 * 24 * 7,
}

exports.register = async (req, res, next) => {
        const {email, password, nick} = req.body;
        const checkUser = await User.findOne({where: {email}});
        if(checkUser) return next(createError(400, 'already Existed'));
        const hash = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hash,
            nick
        });
        
        const initCatecorys = await Category.findAll({where : {isinit: true}});
        await Promise.all(initCatecorys.map((category)=> newUser.addCategories(category)));
        res.status(200).json({success: true, message: 'register success'});

}

exports.localLogin = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) return next(authError);
        if(!user) return res.json({success: false, message: info.message});
        req.locals = {user, type: 'local'};
        next();
    })(req, res, next);
}

exports.kakaoLogin = async (req, res, next) => {
    passport.authenticate('kakao', {session: false}, (err, user) => {
        if(err) return next(createError(500, err));
        req.locals = {user, type: 'kakao'};
        next();
    })(req, res, next);
}

exports.logout = (req, res, next) => {
    
    res.clearCookie(TOKEN_NAME, TOKEN_CONFIG);
    res.status(200).json({success: true, message: 'logout success'});

}

exports.generateToken = (req, res, next) => {
    const {user,  type} = req.locals;
    const secretKey = process.env.JWT_SECRET;
    console.log(user.nick);
    console.log(user);
    const payLoad = {
        id: user.id,
        email: user.email,
        nick : user.nick,
    }

    const token = jwt.sign(payLoad, secretKey);
    res.cookie(TOKEN_NAME, token, TOKEN_CONFIG);
    if(type === 'kakao') return res.redirect('/');
    if(type === 'local') return res.status(200).json({success: true, message: 'create jwt', user: {nick: user.nick}});

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
    try{
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
   }catch(err){
       console.error(err);
       next(createError(500, err.message));
   }


}

exports.isNotLoggedIn = async(req, res, next) => {
    const token = req.cookies[TOKEN_NAME];
    if(token) return res.json({success: false, message: 'logout required'});
    return next();
}


exports.getUserData = async(req, res, next) => {
    return res.json({success: true, user: {nick : req.user.nick}});
}