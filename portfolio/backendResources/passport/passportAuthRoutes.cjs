

module.exports = function(functions, passport, app){

    app.get("/auth/facebook", functions.userMustNotBeLoggedIn, passport.authenticate("facebook"/*{scope:["email", "user_link"]}*/))
    app.get("/auth/facebook/callback", functions.userMustNotBeLoggedIn, passport.authenticate("facebook", { failureRedirect: "/blogs/?login=1"}), async (req,resp)=>{
        await functions.manageSuccessSocialLogin(req, resp)
    })

    app.get("/auth/github", functions.userMustNotBeLoggedIn, passport.authenticate("github"))
    app.get("/auth/github/callback", functions.userMustNotBeLoggedIn, passport.authenticate("github", {failureRedirect: "/blogs/?login=1"}), async (req,resp)=>{
        await functions.manageSuccessSocialLogin(req, resp)
    })


    app.get("/auth/google", functions.userMustNotBeLoggedIn, passport.authenticate("google", { scope: ['profile', 'email'] }))
    app.get("/auth/google/callback", functions.userMustNotBeLoggedIn, passport.authenticate("google", {scope: ['profile', 'email'], failureRedirect: "/blogs/?login=1"}), async (req,resp)=>{
        await functions.manageSuccessSocialLogin(req, resp)
    })
    app.get("/auth/twitter", functions.userMustNotBeLoggedIn, passport.authenticate("twitter", {  scope: ['tweet.read','users.read','offline.access']}))
    app.get("/auth/twitter/callback", functions.userMustNotBeLoggedIn, passport.authenticate("twitter", {scope: ['tweet.read','users.read','offline.access'], failureRedirect: "/blogs/?login=1"}), async (req,resp)=>{
        await functions.manageSuccessSocialLogin(req, resp)
    })

    app.get("/auth/discord", functions.userMustNotBeLoggedIn, passport.authenticate("discord"))
    app.get("/auth/discord/callback", functions.userMustNotBeLoggedIn, passport.authenticate("discord", {failureRedirect: "/blogs/?login=1"}), async (req,resp)=>{
        await functions.manageSuccessSocialLogin(req, resp)
    })
}