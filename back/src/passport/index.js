const kakao = require('./kakaoStrategy');
const local = require('./localStrategy');
const {User} = require('../models');


module.exports = (passport) => {

    // passport.serializeUser((user, done) => {
    //     console.log('실행~!');
    //     done(null, user.id);
    // })

    // passport.deserializeUser(async (id, done) => {
    //     const user = await User.findOne({where : {id}});
    //     done(null, user);
    // })

    kakao(passport);
    local(passport);
}