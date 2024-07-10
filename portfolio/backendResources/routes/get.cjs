


const crypto = require("crypto")
apiGetRoutes = require("./apiRoutesGet.cjs")
tinymceRoutes = require("./tinymceRoutes.cjs")
passportAuthRoutes = require("../passport/passportAuthRoutes.cjs")
functions = require("../functions.cjs")



module.exports = async function(app, passport=null, DB){

    app.get("/", (req, resp)=>{
        if(resp.headersSent == false){
            req.session["user"] = "Mio"
            resp.render("portfolio.ejs")
        }
    })


    app.get("/blogs", await functions.getLoggedInUserMiddleware(DB), (req,resp, next)=>{
        
        // console.log(req.session, "ufhfui")

        // req.session.userLoggedIn = true
        if(resp.headersSent == false){
            if(req.query.login != undefined){
                req.query.login = "1"
                if(req.session?.userLoggedIn != true){
                    resp.render("blogs.ejs", {loginParam:req.query.login, req})
                    return
                }
            }
            
            if(req.query.signup != undefined){
                req.query.signup = "1"
                if(req.session?.userLoggedIn != true){
                    resp.render("blogs.ejs", {signupParam:req.query.signup, req})
                    return
                }
            }

            // console.log(req.query)
            // console.log(req.session)
            resp.render("blogs.ejs", {req})
            return
        }
    })

    app.get("/blogs/search", await functions.getLoggedInUserMiddleware(DB), (req,resp)=>{
        resp.render("search.ejs", {req})
    })


    app.get("/blogs/users/:userId", await functions.getLoggedInUserMiddleware(DB), (req,resp)=>{
        profileOwnerId = req.params.userId 
        pageProfileOwner = functions.findUser(_DB, 'id=?', profileOwnerId)

        if(pageProfileOwner.success != true){
            //Render error page
            return resp.render("errorAlert.ejs", {req, errorMessage: "An error occured on our end, please try again later.", errorCode: "500"})
        } else {
            if(pageProfileOwner.foundUser==null || pageProfileOwner.foundUser.length<=0){
                //Render 404 page
                return resp.render("errorAlert.ejs", {req, errorMessage: "We couldn't find that page on our server.", errorCode: "404"})
            }

            return resp.render("profile.ejs", {req, profileOwner: pageProfileOwner.foundUser})
        }
    })


    app.get("/blogs/article/:articleUrlId", await functions.getLoggedInUserMiddleware(DB), (req,resp)=>{
        pageBlogUrlId = req.params.articleUrlId 
        splittedUrl = pageBlogUrlId.split("_")
        splittedUrlId = splittedUrl[splittedUrl.length-1]

        pageBlog = functions.getBlogById(DB, splittedUrlId)

        if(pageBlog == null){
            return resp.render("errorAlert.ejs", {req, errorMessage: "We couldn't find that page on our server.", errorCode: "404"})
        }

        _DB = DB.DBPool.getRandomDB()
        pageBlogAuthor = functions.findUser(_DB, 'id=?', pageBlog.author_id)

        console.log(pageBlogAuthor)
        if(pageBlogAuthor.success == false){
            return resp.render("errorAlert.ejs", {req, errorMessage: "We couldn't find that page on our server.", errorCode: "404"})
        }

        pageBlog.author = pageBlogAuthor.foundUser

        resp.render("articlePage.ejs", {req:req, pageBlog: pageBlog})
        //resp.render("profile.ejs", {req})
    })

    app.get("/blogs/new/", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditor, (req,resp)=>{
        newDraftId = crypto.randomUUID()

        this.functions.createDraft(DB, newDraftId, req.loggedInUser.id, "")

        resp.redirect(`/blogs/drafts/edit/${newDraftId}`)
    })


    app.get("/blogs/article/:articleId/edit", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditor, (req,resp)=>{
        pageBlogUrlId = req.params.articleId 
        splittedUrl = pageBlogUrlId.split("_")
        splittedUrlId = splittedUrl[splittedUrl.length-1]

        thisPageArticle = functions.getArticleById(DB, splittedUrlId)

        if(thisPageArticle == null){
            return resp.render("errorAlert.ejs", {req, errorMessage: "We couldn't find that page on our server.", errorCode: "404"})
        } else {

            console.log(thisPageArticle, req.loggedInUser)

            if(thisPageArticle.author_id != req.loggedInUser.id) {
                obj = {
                    success: false,
                    message: "Not authorized to edit this Blog"
                }
                resp.json(obj)
                return
            }

            
            req.pageBlog = thisPageArticle

            resp.render("editBlog.ejs", {req})
        }
    })


    app.get("/blogs/drafts/edit/:draftId", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditor, (req,resp)=>{
        thisPageDraft = functions.getDraftById(DB, req.params.draftId)

        if(thisPageDraft == null){
            return resp.render("errorAlert.ejs", {req, errorMessage: "We couldn't find that page on our server.", errorCode: "404"})
        } else {

            if(thisPageDraft.author_id != req.loggedInUser.id) {
                obj = {
                    success: false,
                    message: "Not authorized to edit this Blog"
                }
                resp.json(obj)
                return
            }

            
            req.pageBlog = thisPageDraft
            resp.render("newBlog.ejs", {req})
        }
    })


    app.get("/blogs/login", functions.userMustNotBeLoggedIn, (req,resp)=>{
        resp.redirect("/blogs/?login")
    })

    app.get("/blogs/signup", functions.userMustNotBeLoggedIn, (req,resp)=>{
        resp.redirect("/blogs/?signup")
    })

    app.get("/blogs/logout", functions.userMustBeLoggedIn, (req,resp)=>{
        req.logout((err)=>{
            if(err){
                //Show error 
                resp.send("An error occure")
                return
            }
            resp.redirect("/blogs")
        })
    })

    apiGetRoutes(app, DB)
    passportAuthRoutes(functions, passport, app)

    tinymceRoutes(app, DB)
}