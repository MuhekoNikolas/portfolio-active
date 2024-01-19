






window.addEventListener("load", ()=>{
    pageOwnerId = document.body.dataset.pageowner

    addEventsToWindow()

    generateBlogContainerPreviewBoxes(pageOwnerId)

    removeDefaultEventFromAnchors()

    initializeTopBarObserver(".topGradientBanner", 0, "-30px 0px")

    initiateBlogSearchInputEvents()

    initializeHidingEventOnLoginAndSignupFormsContainer()
})


document.querySelector(".blogSearchInput").addEventListener("load", (event)=>{
    initiateBlogSearchInputEvents()
})