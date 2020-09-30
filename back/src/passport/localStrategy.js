const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

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