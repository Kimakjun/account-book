const KakaoStategy = require('passport-kakao').Strategy;

const { User } = require('../models');

// 1. /auth/kakao
// 2. 카카오가 로그인.
// 3. /auth/kakao/callback 으로 프로필 반환.
// 4. done => req.user 값넣어줌. !!.
// 카카오 로그인은 따로 회원가입 없고. 

module.exports = (passport) => {
    passport.use(new KakaoStategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/api/v1/auth/kakao/callback', // callback 을 받을 라우터 나중에 만들것!
    }, async (accessToken, refreshToken, profile, done)=> {
        // TODO : accessToken, refreshToken 로직 추가.
        try{
         const exUser = await User.findOne({
                where: {
                    snsId: profile.id,
                    provider: 'kakao'
                }
            })
            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    email: profile._json.kakao_account && profile._json.kakao_account.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                })
                console.log('카카오 로그인 성공~!')
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }))
}