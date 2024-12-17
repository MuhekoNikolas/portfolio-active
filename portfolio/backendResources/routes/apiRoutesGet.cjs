

axios = require("axios")

module.exports = function(app, DB){

    app.get("/api/skills.json", (req,resp)=>{
        resp.sendFile("skills.json", {
            root: __dirname + "/../apiResources"
        })
    })

    app.get("/api/projects.json", (req,resp)=>{
        resp.sendFile("projects.json", {
            root: __dirname + "/../apiResources"
        })
    })

    app.get("/api/contacts.json", (req,resp)=>{
        resp.sendFile("contacts.json", {
            root: __dirname + "/../apiResources"
        })
    })

    app.get("/api/portfolioOwner.json", (req,resp)=>{
        resp.sendFile("portfolioOwner.json", {
            root: __dirname + "/../apiResources" 
        })
    })

    app.get("/api/loremipsum", async (req,resp)=>{
        try{
            _resp = await axios.get("https://loripsum.net/api")
            data = _resp.data         
            resp.json({success:true, text:data})
        } catch (err){
            resp.json({success:false, message:"An error occured"})
        }
    })

    app.get("/api/blogs/articles/:articleId/comments", async (req,resp)=>{
        thisBlogComments = functions.getBlogCommentsById(DB, req.params.articleId)
        return resp.json(thisBlogComments)
    })


    app.get("/api/blogs/articles", async (req,resp)=>{
        articlesAuthor = req.query.author 

        queryStr = ""
        _args = []

        if(articlesAuthor != null && articlesAuthor.length>0){
            queryStr += "author_id=?"
            _args.push(articlesAuthor)
        } 

        thisBlogs = functions.getArticles(DB, queryStr, _args)
        thisBlogs.forEach(x=>{
            console.log(x.title)
        })
        return resp.json(thisBlogs)
    })


    app.get("/api/blogs/users/:userId", (req,resp)=>{
        _DB = DB.DBPool.getRandomDB()
        userId = req.params.userId 
        foundUser = functions.findUser(_DB, 'id=?', userId)

        if(foundUser.success != true){
            //Render error page
            return resp.json({response:null})
        } else {
            if(foundUser.foundUser==null || foundUser.foundUser.length<=0){
                //Render 404 page
                return resp.json({response:null})
            }

            return resp.json({response: foundUser.foundUser})
        }
    })

    app.get("/api/blogs/articles/top", (req, resp) =>{
        queryStr = "" //"is_Top=TRUE"
        _args = []

        thisBlogs = functions.getArticles(DB, queryStr, _args)

        return resp.json(thisBlogs)
    })

}