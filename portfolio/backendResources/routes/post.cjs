

try{
  const fetch = require("node-fetch")
} catch(err){
  const fetch = import("node-fetch")
}

const { JSDOM } = require('jsdom');
const _DOMPurify = require('dompurify');

functions = require("../functions.cjs")

const window = new JSDOM('').window;
const DOMPurify = _DOMPurify(window);


module.exports = async function(app, passport=null, DB){


    app.post("/blogs/drafts/edit/:draftId/", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditor, (req,resp)=>{
        //Post request made by forms, commented it out because the user should just make an http post request to the .../edit/save route.
        return resp.render("errorAlert.ejs", {req, errorMessage: "We couldn't find that page on our server.", errorCode: "404"})
        //Dont run this
        thisPageDraft = functions.getDraftById(DB, req.params.draftId)
    
        if(thisPageDraft == null){
            return resp.render("errorAlert.ejs", {req, errorMessage: "We couldn't find that page on our server.", errorCode: "404"})
        } else {
            if(req.loggedInUser.id == thisPageDraft.author_id){
                savedBlog = functions.saveBlog(DB, thisPageDraft.id, )
                req.pageBlog = thisPageDraft
                resp.render("newBlog.ejs", {req})
            } else {
                resp.send("Not authorized")
            }
        }
    })

    app.post("/blogs/drafts/edit/:draftId/save", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditorAPI, (req,resp)=>{
        content = req.body.content

        if(content == null){
            obj = {
                success: false,
                message: "Missing content"
            }
            resp.json(JSON.stringify(obj))
            return
        }

        thisPageDraft = functions.getDraftById(DB, req.params.draftId)
    
        if(thisPageDraft == null){
            obj = {
                success: false,
                message: "Invalid Draft id"
            }
            resp.json(JSON.stringify(obj))
            return

        } else {
            if(req.loggedInUser.id == thisPageDraft.author_id){
                content = DOMPurify.sanitize(content)
                savedDraft = functions.saveDraft(DB, thisPageDraft.id, content )
                req.pageBlog = thisPageDraft
                obj = {
                    success: true,
                    message: "Saved succesfully"
                }
                resp.json(JSON.stringify(obj))
            } else {
                obj = {
                    success: false,
                    message: "Not authorized to edit/save this Draft"
                }
                resp.json(JSON.stringify(obj))
            }
        }
    })


    app.post("/blogs/articles/edit/:articleId/save", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditorAPI, (req,resp)=>{
        content = req.body.content

        if(content == null){
            obj = {
                success: false,
                message: "Missing content"
            }
            resp.json(JSON.stringify(obj))
            return
        }

        thisPageArticleDraft = functions.getArticleEditById(DB, req.params.articleId)
    
        if(thisPageArticleDraft == null){
            obj = {
                success: false,
                message: "Invalid Article id"
            }
            resp.json(JSON.stringify(obj))
            return

        } else {
            if(req.loggedInUser.id == thisPageArticleDraft.author_id){
                content = DOMPurify.sanitize(content)
                savedDraft = functions.saveArticleDraft(DB, thisPageArticleDraft.id, content )
                req.pageBlog = thisPageArticleDraft
                obj = {
                    success: true,
                    message: "Saved succesfully"
                }
                resp.json(JSON.stringify(obj))
            } else {
                obj = {
                    success: false,
                    message: "Not authorized to edit/save this article"
                }
                resp.json(JSON.stringify(obj))
            }
        }
    })



    app.post("/blogs/drafts/edit/:draftId/upload", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditorAPI, async (req,resp)=>{
        blogTitle = req.body.title
        blogDescription = req.body.description
        blogBanner = req.body.blogBanner

        if(blogTitle == null  || blogTitle.length <= 1){
            obj = {
                success: false,
                message: "Blog title must not be empty."
            }
            resp.json(JSON.stringify(obj))
            return
        }

        if(blogDescription == null  || blogDescription.length <= 10 ){
            obj = {
                success: false,
                message: "Blog description must be longer than 10 characters."
            }
            resp.json(JSON.stringify(obj))
            return
        }

        if(blogBanner == null  || blogBanner.length <= 10 || !(blogBanner.match(new RegExp(/^data:image\/(\w+);base64,(.*)$/))) ){
            obj = {
                success: false,
                message: "Invalid blog banner."
            }
            resp.json(JSON.stringify(obj))
            return
        }

        try{
            thisPageDraft = functions.getDraftById(DB, req.params.draftId)
            if(thisPageDraft == null){
                obj = {
                    success: false,
                    message: "Invalid Draft id"
                }
                resp.json(JSON.stringify(obj))
                return
            } else {
                if(DOMPurify.sanitize(thisPageDraft.content, {USE_PROFILES: {html: false}}).length <= 10){
                    obj = {
                        success: false,
                        message: "The blog's content must be longer than 10 characters."
                    }
                    resp.json(JSON.stringify(obj))
                    return
                }
                if(req.loggedInUser.id == thisPageDraft.author_id){
                    savedBlog = functions.createNewBlog(DB, thisPageDraft, blogTitle, blogDescription, blogBanner, Date.now())
                    _DB = DB.DBPool.getRandomDB()
                    _DB.prepare("DELETE FROM drafts WHERE id=?;").run(savedBlog.id)

                    obj = {
                        success: true,
                        message: "Uploaded succesfully",
                        createdBlogId: savedBlog.blog_url_id
                    }
                    resp.json(JSON.stringify(obj))
                } else {
                    obj = {
                        success: false,
                        message: "Not authorized to upload this Blog"
                    }
                    resp.json(JSON.stringify(obj))
                }
            }
        } catch(err){
            console.log(err.message, 2)
            obj = {
                success: false,
                message: "An error occured."
            }
            resp.json(JSON.stringify(obj))
        }
    })



    app.post("/blogs/articles/edit/:articleId/upload", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditorAPI, async (req,resp)=>{
        
        thisFoundArticleDraft = functions.getArticleEditById(DB, req.params.articleId)

        if(thisFoundArticleDraft == null){
            obj = {
                success: false,
                message: "Invalid Blog Id."
            }
            resp.json(JSON.stringify(obj))
            return
        }

        blogTitle = req.body.title
        blogDescription = req.body.description
        blogBanner = req.body.blogBanner

        if(blogTitle == null  || blogTitle.length <= 1){
            blogTitle = thisFoundArticleDraft.title
        }

        if(blogDescription == null  || blogDescription.length <= 10 ){
            blogDescription = thisFoundArticleDraft.description
        }

        if(blogBanner == null  || blogBanner.length <= 10 || !(blogBanner.match(new RegExp(/^data:image\/(\w+);base64,(.*)$/))) ){
            blogBanner = thisFoundArticleDraft.banner
        }

        thisFoundArticleDraft.title = blogTitle
        thisFoundArticleDraft.description = blogDescription
        thisFoundArticleDraft.banner = blogBanner

        try{
            
            if(DOMPurify.sanitize(thisFoundArticleDraft.content, {USE_PROFILES: {html: false}}).length <= 10){
                obj = {
                    success: false,
                    message: "The blog's content must be longer than 10 characters."
                }
                resp.json(JSON.stringify(obj))
                return
            }

            if(req.loggedInUser.id == thisFoundArticleDraft.author_id){

                savedBlog = functions.uploadBlogDraft(DB, thisFoundArticleDraft, Date.now())

                obj = {
                    success: true,
                    message: "Uploaded succesfully",
                    createdBlogId: savedBlog.blog_url_id
                }
                resp.json(JSON.stringify(obj))
            } else {
                obj = {
                    success: false,
                    message: "Not authorized to upload this Blog"
                }
                resp.json(JSON.stringify(obj))
            }
            
        } catch(err){
            console.log(err.message, err)
            obj = {
                success: false,
                message: "An error occured."
            }
            resp.json(JSON.stringify(obj))
        }
    })

    //http://localhost:8061/blogs/articles/9aae5b0d-08e4-41e1-84cd-ae671495278e/comment
    app.post("/blogs/articles/:blogId/comment", await functions.getLoggedInUserMiddleware(DB), async (req,resp)=>{
        blogId = req.params.blogId
        data = req.body

        if(data.content.length < 2){
            obj = {
                success: false,
                message: "Comment must consist of 2+ characters."
            }
            return resp.json(obj)
        }

        thisCommentBlog = functions.getArticleById(DB, blogId)

        if(thisCommentBlog == null){
            obj = {
                success: false, 
                message: "Invalid blog id."
            }
            return resp.json(obj)
        }

        if(req.loggedInUser == null){
            obj = {
                success: false, 
                message: "User must be logged in."
            }
            return resp.json(obj)
        }

        var commentPoster = req.loggedInUser

        uploadedComment = functions.uploadComment(DB=DB, commentAuthor=commentPoster.id, commentBlog=blogId, commentContent=data.content)

        if(uploadedComment["success"] != true){
            return {
                success: false, 
                message: uploadedComment.message
            }
        }

        console.log(data, uploadedComment) //,commentPoster)

        obj = {success: true, message: "Comment uploaded successfully.", comment: uploadedComment.response}
        return resp.json(obj)
    })

}