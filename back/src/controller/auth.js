const {User} = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const createError = require('http-errors');
const {isEmail, isPassword, isNick} = require('../util/validator');

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
        req.locals = user;
        // next();
        res.json({success: true, user});
    })(req, res, next);
}

exports.kakaoLogin = async (req, res, next) => {
    passport.authenticate('kakao', {session: false, failureRedirect: '/'}, (err, user) => {
        if(err) return next(createError(500, err));
        req.locals = user;
        //next();
        res.json({success: true, user});
    })(req, res, next);
}

exports.kakaoCallBack = (req, res, next) => {
    res.json({success: true, message: 'kakao login success'});
}

exports.generateToken = (req, res, next) => {

//http://www.passportjs.org/packages/passport-jwt-cookiecombo/
}

exports.validateInputs = ({type}) => {
    const checkType = type;
    return (req, res, next)=>{
        const {email, nick, password} = req.body;
        console.log(checkType, nick);
        if(checkType === 'register' && isEmail(email) && isPassword(password) && isNick(nick)) return next();
        if(checkType === 'login' && isEmail(email) && isPassword(password)) return next(); 
        return next(createError(400, 'invalid inputs'))
    }
}
