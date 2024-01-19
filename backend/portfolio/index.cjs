
require("dotenv").config()

function initPortfolio(app){
    express = require("express")

    expressSession = require("express-session")

    config = require("../portfolio/backendResources/config.cjs")
    passportJS = require("../portfolio/backendResources/passport/passport.cjs")
    getRoutes = require("../portfolio/backendResources/routes/get.cjs")
    postRoutes = require("../portfolio/backendResources/routes/post.cjs")

    DB = require("../portfolio/backendResources/databases/DB.cjs")

    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended:true}));
   

    app.use(express.static(__dirname+"/frontendResources/public"))
    app.use(expressSession({ secret: 'my-secret-key', resave: false, saveUninitialized: false }));

    app.set('view engine', 'ejs');

    app.set('views', __dirname+"/frontendResources/private/html");

    passportJS(app, DB)

    getRoutes(app, passport, DB )
    postRoutes(app, passport, DB)

    iframelyCode = "node server"
}

module.exports = initPortfolio