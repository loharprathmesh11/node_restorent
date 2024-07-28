const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require("./models/Person.js");


passport.use(new LocalStrategy(async (userName, passWord, done)=>{
    try {
      console.log('Received Credentials: ', userName, passWord);
      const user = await Person.findOne({username: userName});
      if(!user){
        return done(null, false, {message: 'Incorrect username. '});
      }
      const isPasswordMatch = await user.comparePassword(passWord);
  
      if(isPasswordMatch){
        return done(null, user);
      }else{
        return done(null, false, {message: 'Incorrect password. '});
      }
    } catch (error) {
      return done(error);
    }
  }));

  module.exports = passport;