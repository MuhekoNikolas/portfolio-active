




function initializeTopBarObserver(initiatorQuery=null, threshold=1, rootMargin=null){
    mainWrapper = document.querySelector("#mainWrapper")
    topBarContainerInitiator = document.querySelector(initiatorQuery || ".blogsPageTopPicksSection")

    topBar = document.querySelector(".topBar")

    var topBarContainerObserver = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
                //console.log(entry)
                topBar.classList.toggle("changeColorToWhite", entry.isIntersecting==false)
            })
        },
        {
            root:mainWrapper,
            rootMargin: rootMargin || "0px",
            threshold:threshold
        }
    )

    topBarContainerObserver.observe(topBarContainerInitiator)

}

mainWrapper = document.querySelector("#mainWrapper")
tagsAndBlogsContainer = document.querySelector(".blogsPageBlogsAndTagsSection")


// mainWrapper.addEventListener("scroll", manageTagsAndBlogsSectionMainWrapperScroll)



// function manageTagsAndBlogsSectionMainWrapperScroll(event){
//     if(tagsAndBlogsContainer.getBoundingClientRect().y <= 65){
//         tagsAndBlogsContainer.style["overflow-y"]  = "auto"
//         mainWrapper.style["overflow-y"]  = "hidden"
//     } else {
//         tagsAndBlogsContainer.style["overflow-y"] = null
//         mainWrapper.style["overflow-y"]  = "auto"
//     }
// }

