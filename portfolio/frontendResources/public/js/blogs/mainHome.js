


window.addEventListener("load", ()=>{
    addEventsToWindow()

    removeDefaultEventFromAnchors()

    generatePickedBlogsPreviewBoxes()
    generateBlogContainerPreviewBoxes()

    initializeTopBarObserver(".blogsPageHomeSection", 0, "-70px 0px 0px 0px")
    //initializeTagContainerObserver(".blogsPageTopPicksSection", 0,  "-70px 0px")

    initiateBlogSearchInputEvents()

    initializeHidingEventOnLoginAndSignupFormsContainer()
})
