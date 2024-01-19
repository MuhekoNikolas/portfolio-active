
BlogEditor = new NewBlogEditor(".newBlogContentEditor")



window.addEventListener("resize", ()=>{
    //console.log(BlogEditor.editor.container)
    BlogEditor.editor.container.style.height = `${$(window).height()-100||"200"}px`
})