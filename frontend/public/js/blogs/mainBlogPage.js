


window.addEventListener("load", ()=>{
    addEventsToWindow()

    removeDefaultEventFromAnchors()

    initEditor()

    addBlogComments()

    initializeHidingEventOnLoginAndSignupFormsContainer()
})


function initEditor(){
    tinymce.init({
        theme_options: {
            selector: ".newBlogContentEditor",
            menubar:false,
            toolbar:false,
            statusbar: false,
            inline: true,
            plugins: "autoresize",
            skin:"snow",
            icons:"thin",
            content_css: '/css/pc/blogs/blogContent.css'
        },
    
        setup: (editor)=>{
            editor.mode.set("readonly");
    
            setTimeout(()=>{
                document.querySelector('.newBlogContentEditor').style.visibility = "visible"
            }, 1000)
        }
    })

    initCommentInputEditor()
}

function initCommentInputEditor(selector=".newCommentInput"){

    tinymce.init({
        selector: selector,

        menubar: false,
        inline: true,
        plugins: [
            'lists',
            'powerpaste',
            'autolink',
            'autoresize',
            'wordcount'
        ],

        toolbar: 'bold italic underline code | forecolor backcolor',
        valid_elements: 'strong,em,span[style],a[href]',
        valid_styles: {'*': 'font-size,font-family,color,text-decoration,text-align'},
        powerpaste_word_import: 'clean',
        powerpaste_html_import: 'clean',

        skin:"snow",
        icons:"thin",
        content_css: '/css/pc/blogs/blogContent.css',
    })
}

function initCommentContentStyler(commentContentSelector){
    tinymce.init({
        selector: commentContentSelector,

        menubar: false,
        inline: true,
        plugins: [
            'lists',
            'powerpaste',
            'autolink'
        ],

        toolbar: false,
        valid_elements: 'strong,em,span[style],a[href]',
        valid_styles: {'*': 'font-size,font-family,color,text-decoration,text-align'},
        powerpaste_word_import: 'clean',
        powerpaste_html_import: 'clean',

        skin:"snow",
        icons:"thin",
        content_css: '/css/pc/blogs/blogContent.css',
    
        setup: (editor)=>{
            editor.mode.set("readonly");
        }
    })
}


async function addBlogComments(){
    commentsContainer = $(".allCommentsSection")[0]
    thisBlogId = $("#articlePreview")[0].dataset.blogid
    thisBlogComments = await getBlogCommentsById(thisBlogId)
    blogCommentsCount = thisBlogComments.length

    $(".commentsCount")[0].innerText = blogCommentsCount

    for(blogComment of thisBlogComments){
        thisBlogCommentObj = new CommentObject(blogComment)
        await thisBlogCommentObj.retriveBlogAuthor()
        el = await thisBlogCommentObj.createElement()
        commentsContainer.appendChild(el)
        initCommentContentStyler(`#commentContent-${blogComment.id}`)
    }
}

async function getBlogCommentsById(id){
    return fetch(`/api/blogs/articles/${id}/comments`).then(req=>req.json()).then(data=>{
        return data
    })
}


class CommentObject{
    constructor(data){
        this.data = data
    }

    async retriveBlogAuthor(){ 
        var commentAuthor = await (await fetch(`/api/blogs/users/${this.data.author_id}`)).json()
        if(commentAuthor.response==null){
            this.commentAuthor = "Unknown"
        } else {
            this.commentAuthor = commentAuthor.response
        }

        
    }

    getPostedAtDateString(){
        var currentDate = Date.now()
        var dateDiff = currentDate - this.data.postedAt
        var uploadedAt = null
        var uploadedAtDate = null 

        if(dateDiff < 60000){
            uploadedAt =`${Math.floor(dateDiff/1_000)} s ago`
        } else if(dateDiff >= 60000 && dateDiff < 3600000){
            uploadedAt =`${Math.round(dateDiff/60000)} m ago`
        } else if(dateDiff >= 3600000 && dateDiff < 86_400_000){
            uploadedAt =`${Math.floor(dateDiff/3600000)} h ago`
        } else {
            uploadedAtDate = new Date(this.data.postedAt)
            if(dateDiff < 31_536_000_000 ){
                uploadedAt = uploadedAtDate.toLocaleDateString('en-us', { month:"short", day:"numeric"}) 
            } else {
                uploadedAt = uploadedAtDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
            }     
        }
                                            
        return uploadedAt
    }

    createElement(){
        var elHtml = `<div class="commentContainer">
            <div class="commentTopSection">
                <div class="commentAuthorInfoSection">
                    <div class="commentAuthorPfpSection" style="background-image: url('${this.commentAuthor.profilePicture}');"></div>
                    <div class="commentAuthorNamesSection">
                        <h5 class="commentAuthorName">${this.commentAuthor.fullName}</h5>
                        <span class="commentAtDate">${this.getPostedAtDateString()}</span>
                    </div>
                </div>

                <div class="commentActionButton">
                    <div class="commentOptionsContainer">
                        <p class='reportCommentButton'>Report</p>
                    </div>
                    <svg class="hideMenuSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enable-background="new 0 0 40 40"><line x1="15" y1="15" x2="25" y2="25" stroke="red" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line><line x1="25" y1="15" x2="15" y2="25" stroke="red" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line></svg>
                    <svg class="openMenuSvg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.39 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.4.59.56 0 1.03-.2 1.42-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.6-1.41A1.93 1.93 0 0 0 6.4 10c-.55 0-1.02.2-1.41.59-.4.39-.6.86-.6 1.41zM10 12c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.54 0 1.02-.2 1.4-.59.4-.39.6-.86.6-1.41 0-.55-.2-1.02-.6-1.41a1.93 1.93 0 0 0-1.4-.59c-.55 0-1.04.2-1.42.59-.4.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.57 1.41.4.4.88.59 1.43.59.57 0 1.04-.2 1.43-.59.39-.39.57-.86.57-1.41 0-.55-.2-1.02-.57-1.41A1.93 1.93 0 0 0 17.6 10c-.55 0-1.04.2-1.43.59-.38.39-.57.86-.57 1.41z" fill="currentColor"></path></svg>
                </div>
            </div>

            <p id="commentContent-${this.data.id}" class="commentContentContainer">
                ${this.data.content}
            </p>

        </div>`

        this.el = $(elHtml)[0]
        var loggedInUserId = document.body.dataset.loggedinuserid
        if(loggedInUserId == this.data.author_id){
            this.el.querySelector(".commentOptionsContainer").innerHTML += '<p class="editCommentButton">Edit</p><p class="deleteCommentButton">Delete</p>'
            this.el.querySelector(".editCommentButton").addEventListener("click", this.beginCommentEditProcess.bind(this))
            this.el.querySelector(".deleteCommentButton").addEventListener("click", this.beginCommentDeleteProcess.bind(this))
        }

        this.el.querySelector(".hideMenuSvg").addEventListener("click", this.manageActionsMenuDisplay.bind(this))
        this.el.querySelector(".openMenuSvg").addEventListener("click", this.manageActionsMenuDisplay.bind(this))

        this.el.querySelector(".reportCommentButton").addEventListener("click", this.beginCommentReportProcess.bind(this))

        return this.el
    }

    manageActionsMenuDisplay(){
        var menuOptionsContainer = this.el.querySelector(".commentActionButton")
        if(menuOptionsContainer.classList.contains("menuActive")){
            menuOptionsContainer.classList.remove("menuActive")
        } else {
            menuOptionsContainer.classList.add("menuActive")
        }
    }

    beginCommentEditProcess(){
        alert("Begin Editing comment...")
    }

    beginCommentDeleteProcess(){
        alert("Begin Deleting comment...")
    }

    beginCommentReportProcess(){
        alert("Begin Reporting comment...")
    }
}