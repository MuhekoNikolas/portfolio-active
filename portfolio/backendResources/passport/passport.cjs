

passport = require("passport")
passportStrategies = require("./passportStrategies.cjs")

module.exports = function(app, DB){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            if(user.provider == "facebook"){
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user.profileUrl || "http://localhost:8061/images/pfp.jpg",
                    provider:"facebook"
                }
            } else if(user.provider == "github"){
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user.avatar_url || "http://localhost:8061/images/pfp.jpg",
                    provider:"github"
                }
            } else if(user.provider == "google"){
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user._json.picture || "http://localhost:8061/images/pfp.jpg",
                    provider:"google"
                }
            } else if(user.provider == "twitter"){
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user._json.profile_image_url_https || "http://localhost:8061/images/pfp.jpg",
                    provider:"twitter"
                }
            } else if(user.provider == "discord"){
                serializedUser = {
                    id: user.id,
                    displayName: user.global_name || user.username,
                    profilePicture: "http://localhost:8061/images/pfp.jpg",
                    provider:"discord"
                }
            }
    
            return cb(null, serializedUser);
        });
    });
      
    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });


    passportStrategies(app=app, passport=passport, DB=DB)
}