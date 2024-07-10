
require("dotenv").config()

function initPortfolio(app){
    express = require("express")

    expressSession = require("express-session")

    config = require("./backendResources/config.cjs")
    passportJS = require("./backendResources/passport/passport.cjs")
    getRoutes = require("./backendResources/routes/get.cjs")
    postRoutes = require("./backendResources/routes/post.cjs")

    DB = require("./backendResources/databases/DB.cjs")

    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended:true}));
   

    app.use(express.static(__dirname+"/frontendResources/public"))
    app.use(expressSession({ secret: 'my-secret-key', resave: false, saveUninitialized: false }));

    app.set('view engine', 'ejs');

    app.set('views', __dirname+"/frontendResources/private/html");;

    passportJS(app, DB)

    getRoutes(app, passport, DB )
    postRoutes(app, passport, DB)

    iframelyCode = "node server"
}

module.exports = initPortfolio