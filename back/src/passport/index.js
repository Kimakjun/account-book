const kakao = require('./kakaoStrategy');
const local = require('./localStrategy');



module.exports = (passport) => {

    // EX: SESSION 사용할 경우.!
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