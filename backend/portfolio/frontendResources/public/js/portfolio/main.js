
var professionsSelfWriter;

window.addEventListener("load", ()=>{
    getPortfolioOwnerInfoAndUpdateSite()
    generateSkillPreviewBoxes()
    generateProjectsPreviewBoxes()
    //generateBlogsPreviewBoxes()
    generateContactsPreviewBoxes()
    initializeBioObserver()
})