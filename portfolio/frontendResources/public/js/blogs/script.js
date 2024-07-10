




function addEventsToWindow(){
    window.addEventListener('popstate', (event) => {
        if (event.state) {
           var  loginAndSignupFormsContainer = loginAndSignupFormsContainer || document.querySelector(".loginAndSignupFormsContainer")

            if(event.state?.showLoginFormContainer == true){
                showLoginForm()
                loginAndSignupFormsContainer.classList.add("visible") 
                return
            } else if(event.state?.showSignupFormContainer == true){
                showSignupForm()
                loginAndSignupFormsContainer.classList.add("visible") 
                return
            }

        }
    });
}


function manageSideMenuDiv(){
    bioContainer = document.getElementById("navMenuContainer")
    if(bioContainer.classList.contains("opened")){
        bioContainer.classList.add("closed")
        bioContainer.classList.remove("opened")
    } else {
        bioContainer.classList.add("opened")
        bioContainer.classList.remove("closed")
    }
}


function changeTheme(colorTheme){
    colors = {
        "dark":{
            "--c1": "#090927",
            "--c2": "#141339",
            "--c3": "#0C0C2B",
            "--c4": "#111030",
            "--white": "#FFF1F3",
            "--darkWhite1": "#8787AC",
            "--darkWhite2": "#636288",
            "--darkWhite3": "#5E5E88", 
            "--pink": "#FF516D"
        },
        "light":{
            "--c1": "#3ea8da",
            "--c2":"#258ec1",
            "--c3": "#1287BD",
            "--c4":"#1287BD",
            "--white": "white",
            "--darkWhite1": "#FFF1F3",
            "--darkWhite2": "#FFF1F3",
            "--darkWhite3": "#FFF1F3", 
            "--pink": "#FF516D"
        }
    }

    if(!Object.keys(colors).includes(colorTheme)){return false}

    root = document.querySelector(":root")

    selectedTheme = colors[colorTheme]

    for(colorProperty of Object.keys(selectedTheme)){
        root.style.setProperty(colorProperty, selectedTheme[colorProperty])
    }      
    
}

function manageColorTheme(){
    colorThemeButton = document.querySelector(".topBarThemeButton")
    currentTheme = colorThemeButton.getAttribute("data-theme")
    if(currentTheme == "dark"){
        colorThemeButton.setAttribute("data-theme", "light")
        changeTheme("light")
        colorThemeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`
    } else {
        colorThemeButton.setAttribute("data-theme", "dark")
        changeTheme("dark")
        colorThemeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`
    }
}




async function generatePickedBlogsPreviewBoxes(){
    
    blogsPreviewsContainer = document.querySelector(".blogsPageTopPicksSection .topPicksContainer")

    thisPickedBlogs = await (await fetch('/api/blogs/articles/top')).json()
    
    for(articleInd in thisPickedBlogs){
        article = thisPickedBlogs[articleInd]
        articleAuthor = await (await fetch(`/api/blogs/users/${article.author_id}`)).json()

        if(articleAuthor.response==null){
            continue
        }
        article.author = articleAuthor.response

        if(articleInd < 9){
            counterNumberPrefix = "0"
        } else {
            counterNumberPrefix = ""
        }

        articleUploadedAt = getDateTimeString(article.created_at)

        elementHtml = `
            <div class="portfolioOwnerBlogElementContainer">
                <div class="portfolioOwnerBlogElementContainerNumber" data-counterNumberPrefix="${counterNumberPrefix}"></div>
                <div class="portfolioOwnerBlogElementContainerContentSection">

                    <a class="articleAuthorPageUrl" href="#" style="text-decoration:none;"><div class="portfolioOwnerBlogElementContainerAuthorSection">
                        <div class="portfolioOwnerBlogElementContainerAuthorPfp"></div>
                        <h3 class="portfolioOwnerBlogElementContainerAuthorName"></h3>
                    </div></a>

                    <a class="articlePageUrl" href="#" style="text-decoration:none;"><div class="portfolioOwnerBlogElementContainerTitleSection">
                        <h3 class="portfolioOwnerBlogElementContainerTitle"></h3>
                    </div></a>

                    <div class="portfolioOwnerBlogElementContainerTimestampsSection">
                        <h3 class="portfolioOwnerBlogElementContainerCreationDate">

                        </h3>
                        <h3 class="portfolioOwnerBlogElementContainerReadingtime">

                        </h3>
                    </div>

                </div>
            </div>
        `

        _articlePreviewElement = $(elementHtml)[0]
        Array.from(_articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerAuthorPfp")).forEach(_x=>{
            _x.style.background = `url(${article.author.profilePicture})`
        })
        Array.from(_articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerAuthorName")).forEach(_x=>{
            _x.textContent = article.author.fullName
        })
        Array.from(_articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerTitle")).forEach(_x=>{
            _x.textContent = article.title
        })
        Array.from(_articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerThesis")).forEach(_x=>{
            _x.textContent = article.description
        })
        Array.from(_articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerCreationDate")).forEach(_x=>{
            _x.textContent = articleUploadedAt
        })
        Array.from(_articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerReadingtime")).forEach(_x=>{
            _x.textContent = `${article.readingTime} min read`
        })

        Array.from(_articlePreviewElement.querySelectorAll(".articlePageUrl")).forEach(_x=>{
            _x.setAttribute("href", `/blogs/article/${article.id}`)
        }) 

        Array.from(_articlePreviewElement.querySelectorAll(".articleAuthorPageUrl")).forEach(_x=>{
            _x.setAttribute("href", `/blogs/users/${article.author.id}`)
        }) 
    
        blogsPreviewsContainer.appendChild(_articlePreviewElement)

    }
}



async function generateBlogContainerPreviewBoxes(ownerId=""){
    blogsContainersPreviewsContainer = document.querySelector(".blogsPageBlogsAndTagsSection .blogsSection")

    articles = await (await fetch(`/api/blogs/articles?author=${ownerId}`)).json()
    
    for(var _x=0; _x<articles.length; _x++){
        _article = articles[_x]
        console.log(1, articles.length)
        articleAuthor = await (await fetch(`/api/blogs/users/${_article.author_id}`)).json()

        if(articleAuthor.response == null){
            continue
        }
                                            
        articleUploadedAt = getDateTimeString(_article.created_at)

        _article.author = articleAuthor.response

        elementHtml = `
            <div class="blogElementContainer">
                <div class="portfolioOwnerBlogElementContainerContentSection">

                    <a class="articleAuthorPageUrl" href="#" style="text-decoration:none;"><div class="portfolioOwnerBlogElementContainerAuthorSection">
                        <div class="portfolioOwnerBlogElementContainerAuthorPfp"></div>
                        <h3 class="portfolioOwnerBlogElementContainerAuthorName"></h3>
                    </div></a>

                    <a class="articlePageUrl" href="#" style="text-decoration:none;">
                        <div class="portfolioOwnerBlogElementContainerTitleSection">
                            <h3 class="portfolioOwnerBlogElementContainerTitle"></h3>
                            <h4 class="portfolioOwnerBlogElementContainerThesis"></h4>
                        </div>
                    </a>

                    <div class="portfolioOwnerBlogElementContainerTimestampsSection">
                        <h3 class="portfolioOwnerBlogElementContainerCreationDate">
                            3 Jul
                        </h3>
                        <h3 class="portfolioOwnerBlogElementContainerReadingtime">
                            3 min read
                        </h3>
                    </div>

                </div>
                <a class="articlePageUrl" href="#" style="text-decoration:none;">
                    <div class="blogElementContainerBanner"></div>
                </a>
            </div>
        `
        articlePreviewElement = $(elementHtml)[0]
        Array.from(articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerAuthorPfp")).forEach(_x=>{
            _x.style.background = `url(${_article.author.profilePicture})`
        })
        Array.from(articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerAuthorName")).forEach(_x=>{
            _x.textContent = _article.author.fullName
        })
        Array.from(articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerTitle")).forEach(_x=>{
            _x.textContent = _article.title
        })
        Array.from(articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerThesis")).forEach(_x=>{
            _x.textContent = _article.description
        })
        Array.from(articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerCreationDate")).forEach(_x=>{
            _x.textContent = articleUploadedAt
        })
        Array.from(articlePreviewElement.querySelectorAll(".portfolioOwnerBlogElementContainerReadingtime")).forEach(_x=>{
            _x.textContent = `${_article.readingTime} min read`
        })
        Array.from(articlePreviewElement.querySelectorAll(".blogElementContainerBanner")).forEach(_x=>{
            _x.style.background = `url(${_article.banner})`
        })

        Array.from(articlePreviewElement.querySelectorAll(".articlePageUrl")).forEach(_x=>{
            _x.setAttribute("href", `/blogs/article/${_article.id}`)
        })

        Array.from(articlePreviewElement.querySelectorAll(".articleAuthorPageUrl")).forEach(_x=>{
            _x.setAttribute("href", `/blogs/users/${_article.author.id}`)
        }) 

        blogsContainersPreviewsContainer.appendChild(articlePreviewElement)
    }
    
}


function getDateTimeString(timestamp){
    var currentDate = Date.now()
    var dateDiff = currentDate - timestamp
    var uploadedAt = null
    var uploadedAtDate = null 

    if(dateDiff < 60000){
        uploadedAt =`${Math.floor(dateDiff/1_000)} s ago`
    } else if(dateDiff >= 60000 && dateDiff < 3600000){
        uploadedAt =`${Math.round(dateDiff/60000)} m ago`
    } else if(dateDiff >= 3600000 && dateDiff < 86_400_000){
        uploadedAt =`${Math.floor(dateDiff/3600000)} h ago`
    } else {
        uploadedAtDate = new Date(timestamp)
        if(dateDiff < 31_536_000_000 ){
            uploadedAt = uploadedAtDate.toLocaleDateString('en-us', { month:"short", day:"numeric"}) 
        } else {
            uploadedAt = uploadedAtDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
        }     
    }

    return uploadedAt
}

function showLoginAndSignupFormsContainer(){

    var loginAndSignupFormsContainer = loginAndSignupFormsContainer || document.querySelector(".loginAndSignupFormsContainer")

    if(loginAndSignupFormsContainer.classList.contains("showLoginFormContainer")){
        history.replaceState({showLoginFormContainer: true}, "Login", "/blogs/login")
        window.dispatchEvent(new PopStateEvent("popstate", { state: {showLoginFormContainer: true} }))
    } else if(loginAndSignupFormsContainer.classList.contains("showSignupFormContainer")){
        history.replaceState({showSignupFormContainer: true}, "Signup", "/blogs/signup")
        window.dispatchEvent(new PopStateEvent("popstate", { state: {showSignupFormContainer: true} }))
    } 
}

function showLoginForm(){
    loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer")
    loginAndSignupFormsContainer.classList.remove("showSignupFormContainer")
    loginAndSignupFormsContainer.classList.add("showLoginFormContainer")
    history.replaceState(null, "Login", "/blogs/login")    
}

function showSingupForm(){
    loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer")
    loginAndSignupFormsContainer.classList.remove("showLoginFormContainer")
    loginAndSignupFormsContainer.classList.add("showSignupFormContainer")
    history.replaceState(null, "Signup", "/blogs/signup")
}



function initializeHidingEventOnLoginAndSignupFormsContainer(){
    loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer")
    loginFormContainer = document.querySelector(".loginFormContainer")
    signupFormContainer = document.querySelector(".signupFormContainer")

    loginFormCloseButton = document.querySelector(".loginFormContainerCloseButton")
    signupFormCloseButton = document.querySelector(".signupFormContainerCloseButton")

    loginAndSignupFormsContainer.addEventListener("click", (event)=>{
        if( ( event.target == loginFormCloseButton || loginFormCloseButton.contains(event.target)) || ( event.target == signupFormCloseButton || signupFormCloseButton.contains(event.target)) || event.target != loginFormContainer && event.target != signupFormContainer && loginFormContainer.contains(event.target) == false && signupFormContainer.contains(event.target) == false){

            currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('login');
            currentUrl.searchParams.delete('signup');

            if(currentUrl.pathname == "/blogs/login" || currentUrl.pathname == "/blogs/signup"){
                currentUrl.pathname = new URL(location.href).pathname
            }

            history.replaceState(null, '', currentUrl);
            loginAndSignupFormsContainer.classList.remove("visible")
        }
    })
}


function manageBlogSearchInputLabel(){
    blogSearchInputLabel = document.querySelector(".blogSearchInputLabel")
    blogSearchInput = document.querySelector(".blogSearchInput")

    blogSearchInputLabel.style.display = "none"
    blogSearchInput.select()
}


function blogsInputSearch(){

    blogSearchInput = document.querySelector(".blogSearchInput")
    if(blogSearchInput.value.length <= 0){
        return
    } else {
        _searchPageUrl = new URL(`${new URL(window.location.href).origin}/blogs/search/?text=${encodeURIComponent(blogSearchInput.value)}`)
        
        window.location = _searchPageUrl
    }
}

function initiateBlogSearchInputEvents(){
    blogSearchInput = document.querySelector(".blogSearchInput")
    blogSearchInputLabel = document.querySelector(".blogSearchInputLabel")

    if(blogSearchInput.value.length > 0){
        blogSearchInputLabel.style.display = "none"
    }

    blogSearchInput.addEventListener("blur", ()=>{
        if(blogSearchInput.value.length <= 0){
            blogSearchInputLabel.style.display = "flex"
        } else {
            blogSearchInputLabel.style.display = "none"
        }
    })

    blogSearchInput.addEventListener("focus", ()=>{
        blogSearchInputLabel.style.display = "none"
    })

    blogSearchInput.addEventListener("keyup", (event)=>{
        if(event.keyCode == 13){
            blogsInputSearch()
        }
    })
}


function removeDefaultEventFromAnchors(){
    document.querySelectorAll("a.noRedirect").forEach((_x)=>{_x.addEventListener("click", (event)=>{
        event.preventDefault()
    })})
}

function manageArticleOptionMenu(event){
    thisMenu = event.target.parentNode.querySelector(".articleOptionsMenu")
    if(thisMenu ==null){
        return
    }
    
    if(thisMenu.classList.contains("active")){
        thisMenu.classList.remove("active")
    } else {
        thisMenu.classList.add("active")
    }
}


async function beginCommentSubmission(){
    submittedComment = await submitComment()

    if(submittedComment.success != true){
        Toastify({
            text: submittedComment.message,
            duration: 3000,
            close: true,
            position: "center",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #ff0000)",
            },
        }).showToast();

    } else {
        Toastify({
            text: submittedComment.message,
            duration: 3000,
            close: true,
            position: "center",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast()
        
    }
}


function submitComment(){
    thisCommentElement = $("#newCommentMainInput")[0]
    thisBlogElement = $("#articlePreview")[0]

    if(thisCommentElement == null || thisBlogElement == null){
        return {
            success: false,
            message: "An error occured."
        }
    }

    commentEditor = tinymce.get("newCommentMainInput")
    if(commentEditor == null){
        return {
            success: false, 
            message: "An error occured, please try again later."
        }
    }
    
    commentText = commentEditor.getContent() 
    thisBlogId = thisBlogElement.dataset.blogid

    if(commentText.length <=0){
        return {
            success: false,
            message: "Comment can't be empty."
        }
    }

    if(thisBlogId.length <=0){
        return {
            success: false,
            message: "Blog id cant be empty."
        }
    }

    var postMethods = {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: commentText})
    }

    return fetch(`/blogs/articles/${thisBlogId}/comment`, postMethods).then(req=>req.json()).then(data=>{

        if(data.success!=true){
            return {
                success: false,
                message: data.message
            }
        } else {
            //Add the comment to the page for me and return
            return {
                success: true,
                message: data.message
            }
        }
    })
    
}
