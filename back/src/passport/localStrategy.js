const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

// 1. /auth/kakao
// 2. 카카오가 로그인.
// 3. /auth/kakao/callback 으로 프로필 반환.
// 4. done => req.user 값넣어줌. !!.
// 카카오 로그인은 따로 회원가입 없고. 

module.exports = (passport) => {
   passport.use(new LocalStrategy({
       usernameField: 'email',
       passwordField: 'password',
   }, async(email, password, done) => {
       try{
           const exUser = await User.findOne({where: {email, provider: 'local'}});

            if(exUser){
                const isRightPassword = await bcrypt.compare(password, exUser.password);
                if(isRightPassword) return done(null, exUser);
                else return done(null, false, {message : 'incorrect password'});
            }else{
                done(null, false, {message: 'none exist user'});
            }

       }catch(error){
           console.error(error);
           done(error);
       }
   }))
}