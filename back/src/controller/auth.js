const {User} = require('../models');
const bcrypt = require('bcrypt');
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

exports.kakaoLogin = async (req, res, next) => {
    
}

exports.kakaoCallBack = (req, res, next) => {
    res.json({success: true, message: 'kakao login success'});
}


exports.generateToken = (req, res, next) => {
    console.log('test');
    res.json({test:'test'});
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
