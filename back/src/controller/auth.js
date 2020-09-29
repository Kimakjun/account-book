const User = require('../models/user');


exports.register = async (req, res, next) => {


}

exports.kakaoLogin = async (req, res, next) => {
    
}

exports.kakaoCallBack = (req, res, next) => {
    res.json({success: true, message: 'kakao login success'});
}