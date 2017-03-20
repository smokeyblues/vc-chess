var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  User = require('../models/user'),
  config = require('../config');

passport.serializeUser((session, next)=>{
  next(null, session.id);
});

passport.deserializeUser((cookie, next)=>{
  User.findOne({_id : cookie}, (err, user)=>{
    next(null, user);
  });
});

passport.use(

  new GoogleStrategy({
    clientID      : config.googleClientID,
    clientSecret  : config.googleSecret,
    callbackURL   : "auth/google/callback"
  }, (accessToken, refreshToken, profile, next)=>{
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    User.findOne({gid : profile.id}, (err, user)=>{

      if(err){
        return next(err);
      }

      if(!user){

        new User({

        }).save((err, savedUser)=>{
          next(null, savedUser)
        })
      } else {
        next(null, user)
      }
    })
  })
)
