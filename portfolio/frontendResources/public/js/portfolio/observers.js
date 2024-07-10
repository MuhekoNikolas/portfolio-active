


function initializeSkillsObserver(){
    skillsContainer = document.querySelector(".pageSkillsSectionContentsContainer")
    skillPreviews = skillsContainer.children

    var skillsObserver = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
                _skill = entry.target
                _skill.classList.toggle("showSkill",entry.isIntersecting)
            })
        },
        {
            root:document.querySelector("#mainWrapper"),
            threshold:0.5
        }
    )

    for(skill of skillPreviews){
        skillsObserver.observe(skill)
    }
}

function initializeProjectsObserver(){
    projectContainer = document.querySelector(".projectsSlideShow")
    projectPreviews = projectContainer.children
    var projectsObserver = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
                _project = entry.target
                _project.classList.toggle("showProject",entry.isIntersecting)
            })
        },
        {
            root:projectContainer,
            threshold:0.1
        }
    )

    for(project of projectPreviews){
        projectsObserver.observe(project)
    }

}

function initializeBioObserver(){
    mainWrapper = document.querySelector("#mainWrapper")
    bioContainer = document.querySelector("#pageAboutSection")

    var bioContainerObserver = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
                _bioCont = entry.target
                _bioCont.classList.toggle("showBio",entry.isIntersecting)
            })
        },
        {
            root:mainWrapper,
            threshold:0.3
        }
    )

    bioContainerObserver.observe(bioContainer)

}