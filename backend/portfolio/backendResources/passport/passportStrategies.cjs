

facebookPassportStrategy = require("passport-facebook").Strategy
githubPassportStrategy = require("passport-github2").Strategy
googlePassportStrategy = require("passport-google-oauth20").Strategy
twitterPassportStrategy = require("passport-twitter").Strategy
discordPassportStrategy = require("passport-discord").Strategy
functions = require("../functions.cjs")

module.exports = function(app, passport, DB){
    passport.use( new facebookPassportStrategy({
            clientID: process.env.CLIENT_ID_FACEBOOK,
            clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
            callbackURL: "http://localhost:8061/auth/facebook/callback",
            // profileFields: ['id', 'photos', 'name', 'displayName', 'gender', 'profileUrl', 'email'],
        },

        function(accessToken, refreshToken, profile, done) {
            console.log(profile)
            return done(null, profile)
        }
    ))


    passport.use(new githubPassportStrategy({
        clientID: process.env.CLIENT_ID_GITHUB,
        clientSecret: process.env.CLIENT_SECRET_GITHUB,
        callbackURL: "http://localhost:8061/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          console.log(profile)
          return done(null, profile)
        }
    ))


    passport.use(new googlePassportStrategy({
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL: "http://localhost:8061/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
      }
    ));


    passport.use(new twitterPassportStrategy({
        consumerKey: process.env.CLIENT_ID_TWITTER,
        consumerSecret: process.env.CLIENT_SECRET_TWITTER,
        callbackURL: "http://localhost:8061/auth/twitter/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
      }
    ));


    passport.use(new discordPassportStrategy({
        clientID: process.env.CLIENT_ID_DISCORD,
        clientSecret: process.env.CLIENT_SECRET_DISCORD,
        callbackURL: "http://localhost:8061/auth/discord/callback",
        scope: ['identify', 'email']
      },

      async function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null,profile)
      }
    ));

}