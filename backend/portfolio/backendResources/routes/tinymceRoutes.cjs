




axios = require("axios")


module.exports = function(app, DB){


    app.get("/1/embed", async (req, resp)=>{
        requestedUrl = req.query.url 

        try{
            if(requestedUrl == null){
                return resp.json({g:1})
            }

            _req = await axios.get(`http://localhost:8061/oembed`, { params: { url: requestedUrl } })

            if (_req.status >= 200 && _req.status < 300) {
                console.log(2)
                return resp.json(_req.data)
            } else {
                return resp.json({h:1})
            }

        } catch(err){
            console.log(err)
            return resp.json({f:1})
        }
    })


    app.get("/1/check", async (req,resp)=>{
        requestedUrl = req.query.url 

        try{
            if(requestedUrl == null){
                obj = {results:[{url:"https://fjkokfoifjfiljfudik.com",result:"UNKNOWN"}]}
                return resp.json(obj)
            }

            _req = await axios.get(requestedUrl)
            if (_req.status >= 200 && _req.status < 300) {
                obj = {results:[{url:requestedUrl,result:"VALID"}]}
                return resp.json(obj)
            } else {
                obj = {results:[{url:requestedUrl,result:"INVALID"}]}
                return resp.json(obj)
            }

        } catch(err){
            obj = {results:[{url:"https://fjkokfoifjfiljfudik.com",result:"UNKNOWN"}]}
            return resp.json(obj)
        }

    })


    app.post("/1/check", async (req,resp)=>{
        requestedUrls = req.body?.urls 
        var requestedUrl;

        try{
            if(requestedUrls == null || requestedUrls.length < 1){
                obj = {results:[{url:"NONE",result:"INVALID"}]}
                return resp.json(obj)
            }

            requestedUrl = requestedUrls[0]?.url

            _req = await axios.get(requestedUrl)
            if (_req.status >= 200 && _req.status < 300) {
                obj = {results:[{url:requestedUrl,result:"VALID"}]}
                return resp.json(obj)
            } else {
                obj = {results:[{url:requestedUrl,result:"INVALID"}]}
                return resp.json(obj)
            }

        } catch(err){
            console.log(err.message)
            obj = {results:[{url:"https://invalidurlunknown.com",result:"INVALID"}]}
            return resp.json(obj)
        }
    })


    app.get("/2/autocorrect", (req,resp)=>{
        try{
            resp.sendFile("autocorrect.json", {
                root: "./backendResources/apiResources"
            })
        } catch (err) {
            resp.send("{}")
        }

    })

}