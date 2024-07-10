const crypto = require("crypto")

try{
  const fetch = require("node-fetch")
} catch(err){
  const fetch = require("@replit/node-fetch")
}

const { JSDOM } = require('jsdom');
const _DOMPurify = require('dompurify');

const window = new JSDOM('').window;
const DOMPurify = _DOMPurify(window);


function findUser(DB, queries, values){

    try{
        foundUser = DB.prepare(`SELECT * FROM users WHERE ${queries};`).get(values)
        return { success: true, foundUser:foundUser}
    } catch(err){
        return {success:false, message:err.message}
    }
}


function createUser(DB, queries, valueQueries, values){

    try{
        DB.prepare(`INSERT INTO users ${queries} VALUES ${valueQueries};`).run(values)
        createdUser = DB.prepare("SELECT * FROM users WHERE id=?").get(values[0])
        return { success: true, createdUser}
    } catch(err){
        return {success:false, message:err.message}
    }
}


async function manageSuccessSocialLogin(req, resp){

    profile = req.session.passport.user
    _DB = DB.DBPool.getRandomDB()

    foundUserData = findUser(_DB, `${profile.provider}_id=?`, [profile.id])

    if(foundUserData.success == false){
        // console.log(foundUserData)
        _DB.close()
        req.logout((err)=>{})
        return resp.redirect("/blogs/?login=1&error=1")
    }

    if(foundUserData.foundUser == undefined){
        createdUserData = createUser(_DB, `('id', 'fullName', 'profilePicture', '${profile.provider}_id')`, `(?, ?, ?, ?)`, [`${crypto.randomUUID()}`, profile.displayName, await imageUrlToDataurl(profile.profilePicture), profile.id])

        if(createdUserData.success == false){
            _DB.close((err)=>{})
            req.logout((err)=>{})
            return resp.redirect("/blogs/?signup&error=1")
        }

        // console.log(createdUserData, "uhgugu")
        _DB.close()
        req.session["userLoggedIn"] = true
        req.session["loggedInUserId"] = createdUserData.createdUser.id
        return resp.redirect("/blogs")

    } else {
        // console.log(foundUserData.foundUser, "gyuguygig")
        _DB.close()
        req.session["userLoggedIn"] = true
        req.session["loggedInUserId"] = foundUserData.foundUser.id
        return resp.redirect("/blogs")
    }
}


function getLoggedInUserMiddleware(DB){
    return async (req, resp, next) => {
        _DB = DB.DBPool.getRandomDB()
        req.loggedInUser = await getLoggedInUser(DB, req)
        next()
    }
}

async function getLoggedInUser(DB, req){
    if(req?.session?.loggedInUserId == null){
        return null
    } else {
        foundUser = findUser(_DB, `id=?`, [req.session.loggedInUserId]).foundUser
        return foundUser
    }
}


function userMustNotBeLoggedIn(req, resp, next){
    
    if(req.session?.userLoggedIn == true){
        resp.redirect("/blogs")
        return
    } else {
        next()
        return
    }
}


function userMustBeLoggedIn(req, resp, next){
    if(req.session?.userLoggedIn == true){
        next()
        return
    } else {
        resp.redirect("/blogs/?login=1")
        return
    }
}


async function imageUrlToDataurl(imageUrl){
    try{
        _request = await fetch(imageUrl)
    } catch (err){
        _request = await fetch("http://localhost:2000/images/pfp.jpg")
    }

    buffer = await _request.arrayBuffer()
    stringifiedBuffer = Buffer.from(buffer).toString("base64")
    contentType = _request.headers.get("content-type")
    res = `data:${contentType};base64,${stringifiedBuffer}`
    return res
}



function createDraft(DB, draftId, loggedInUser, content=""){
    _DB = DB.DBPool.getRandomDB()
    _DB.prepare(`INSERT INTO drafts (id, author_id, content) VALUES (?,?,?);`).run([draftId, loggedInUser, content])
    return draftId
}


function getDraftById(DB, draftId){
    _DB = DB.DBPool.getRandomDB()
    foundDraft = _DB.prepare(`SELECT * FROM drafts WHERE id=?`).get([draftId])
    if(foundDraft == undefined){
        return null
    } else {
        return foundDraft
    }
}


function getArticleEditById(DB, articleDraftId){
    _DB = DB.DBPool.getRandomDB()
    foundDraft = _DB.prepare(`SELECT * FROM article_drafts WHERE id=?`).get([articleDraftId])
    if(foundDraft == undefined){
        return null
    } else {
        return foundDraft
    }
}


function getArticleById(DB, articleId){
    _DB = DB.DBPool.getRandomDB()
    foundArticle = _DB.prepare(`SELECT * FROM blogs WHERE id=?`).get([articleId])
    if(foundArticle == undefined){
        return null
    } else {
        return foundArticle
    }
}


function userMustBeEditor(req,resp, next){
    //console.log(req.loggedInUser)
    if(req.session?.userLoggedIn == true){
        if(req.loggedInUser.is_editor == true){
            next()
            return
        } else {
            resp.send("Not authorized")
            return
        }
    } else {
        resp.redirect("/blogs/?login=1")
        return
    }
}

function userMustBeEditorAPI(req, resp, next){
    if(req.session?.userLoggedIn == true){
        if(req.loggedInUser.is_editor == true){
            next()
            return
        } else {
            obj = {
                success: false,
                message: "User not authorized to edit/save this document."
            }
            resp.json(JSON.stringify(obj))
        }
    } else {
        obj = {
            success: false,
            message: "User not logged in"
        }
        resp.json(JSON.stringify(obj))
        return
    }
}


function saveDraft(DB, blogId, content){
    _DB = DB.DBPool.getRandomDB()
    _DB.prepare("UPDATE drafts SET content=? WHERE id=?;").run(content, blogId)
}

function saveArticleDraft(DB, blogId, content){
    _DB = DB.DBPool.getRandomDB()
    _DB.prepare("UPDATE article_drafts SET content=? WHERE id=?;").run(content, blogId)
}

function createNewBlog(DB, draft, title, description, banner, currentDate){
    _DB = DB.DBPool.getRandomDB()
    blogURL_ID = `${encodeURIComponent(title.replaceAll(" ", "_"))}_${draft.id}`
    blogReadingTime = getReadingTime(draft.content)
    _DB.prepare("INSERT INTO blogs (id, blog_url_id, author_id, title, banner, description, content, readingTime, created_at, last_edited_at) VALUES (?,?,?,?,?,?,?,?,?,?)").run(draft.id, blogURL_ID, draft.author_id, title, banner, description, draft.content, blogReadingTime, currentDate, currentDate)
    _DB.prepare("INSERT INTO article_drafts (id, blog_url_id, author_id, title, banner, description, content, readingTime, created_at, last_edited_at) VALUES (?,?,?,?,?,?,?,?,?,?)").run(draft.id, blogURL_ID, draft.author_id, title, banner, description, draft.content, blogReadingTime, currentDate, currentDate)
    createdBlog = _DB.prepare("SELECT * FROM blogs WHERE id=?").get(draft.id)
    return createdBlog
}

function uploadBlogDraft(DB, blogDraft, currentDate){
    _DB = DB.DBPool.getRandomDB()
    blogID = blogDraft.blog_url_id
    blogReadingTime = getReadingTime(blogDraft.content)
    blogDraft.readingTime = blogReadingTime

    _DB.prepare("UPDATE article_drafts SET blog_url_id=?, title=?, banner=?, description=?, content=?, readingTime=?, last_edited_at=? WHERE id=?;").run(blogID, blogDraft.title, blogDraft.banner, blogDraft.description, blogDraft.content, blogDraft.readingTime, currentDate, blogDraft.id)
    _DB.prepare("UPDATE blogs SET blog_url_id=?, title=?, banner=?, description=?, content=?, readingTime=?, last_edited_at=? WHERE id=? ;").run(blogID, blogDraft.title, blogDraft.banner, blogDraft.description, blogDraft.content, blogDraft.readingTime, currentDate, blogDraft.id)


    uploadedBlog = _DB.prepare("SELECT * FROM blogs WHERE id=?;").get(blogDraft.id)
    return uploadedBlog
}


function getBlogById(DB, blogId){
    _DB = DB.DBPool.getRandomDB()
    foundBlog = _DB.prepare("SELECT * FROM blogs WHERE id=?").get(blogId)
    if(foundBlog == undefined){
        return null
    } else {
        return foundBlog
    }
}


function getReadingTime(text){
    averageSpeed = 225;
    words = text.trim().split(/\s+/).length;
    time = Math.ceil(words / averageSpeed);
    return time;
}


function getRandomGuestAccount(){
    return {
        id: "guest-96b543dc-e1a1-47e3-b52e-3ef4bf2ef108",
        fullName: "Guest",
        profilePicture: "",
        email: null,
        is_editor: false,
        is_guest: true,
        google_id: null,
        facebook_id: null,
        twitter_id: null,
        github_id: null,
        discord_id: null
    }
}

function uploadComment(DB, commentAuthor, commentBlog, commentContent, commentPostDate=Date.now()){
    try{
        _DB = DB.DBPool.getRandomDB()

        thisCommentId = crypto.randomUUID()

        _DB.prepare("INSERT INTO comments (id, author_id, blog_id, content, postedAt) VALUES (?,?,?,?,?)").run(thisCommentId, commentAuthor, commentBlog, commentContent, commentPostDate)
        createdComment = _DB.prepare("SELECT * FROM comments WHERE id=?").get(thisCommentId)

        return {
            success: true,
            message: "Comment posted successfully!",
            response: createdComment
        }

    } catch(err) {
        console.log(err)
        return {
            success: false,
            message: "An error occured."
        }
    }
}


function getBlogCommentsById(DB, blogId){
    try{
        _DB = DB.DBPool.getRandomDB()
        thisBlogComments = _DB.prepare("SELECT * FROM comments WHERE blog_id=?").all([blogId])
        return thisBlogComments
    } catch(err) {
        console.log(err)
        return  [{}]
    }
}


function getArticles(DB, queryString=null, args=[]){
    try{
        _DB = DB.DBPool.getRandomDB()

        if(queryString != null && queryString.length>=3){
            thisBlogs = _DB.prepare(`SELECT * FROM blogs WHERE ${queryString}`).all(args)
        } else {
            thisBlogs = _DB.prepare(`SELECT * FROM blogs;`).all(args)
        }

        return thisBlogs
    } catch(err) {
        console.log(err)
        return  [{}]
    }
}



module.exports = {
    findUser,
    createUser,
    manageSuccessSocialLogin,
    getLoggedInUserMiddleware,
    userMustNotBeLoggedIn,
    userMustBeLoggedIn,
    createDraft,
    userMustBeEditor,
    userMustBeEditorAPI,
    getDraftById,
    getArticleById,
    getArticleEditById,
    saveDraft,
    saveArticleDraft,
    getBlogById,
    createNewBlog,
    uploadBlogDraft,
    getReadingTime,
    getRandomGuestAccount,
    getBlogCommentsById,
    getArticles,
    uploadComment
}