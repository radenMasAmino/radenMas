const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const users = require('../model/usersModel')

passport.serializeUser(function(user, done) {
  
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null,user)
  });

passport.use(new GoogleStrategy({
    clientID: "254452238572-1kls0dqm7mk7235r5d1bio6uh2pveb9r.apps.googleusercontent.com",
    clientSecret: "L0MeavIWyz-ybflL_d1EByQi",
    callbackURL: "http://localhost:8805/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile,done) {
   await users.findOrCreate({
        
        where: {
          username: profile.emails[0].value
        },
        defaults: {
            // profilPicture : profile.photos[0].value,
            email : profile.emails[0].value,
            role : "guest"
        }
      }).then(data=>{

        done(null, data)
      })
  
}
));

module.exports=passport