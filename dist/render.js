class Renderer {
    
    renderRecipes(recipes){
        $("#recipes").empty()
        const source = $("#recipes-template").html()
        const template = Handlebars.compile(source)
        let newHTML = template({recipes})
        $("#recipes").append(newHTML)
    }
}