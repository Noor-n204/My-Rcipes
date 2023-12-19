const renderer = new Renderer()


const searchRecipes = function(){
    let ingredient = $("#inputSearch").val()
    let diaryInput = $("#diary-ingredients")[0].checked   
    let glutenInput = $("#gluten-ingredients")[0].checked

    console.log(diaryInput, glutenInput)

    $.get(`/recipes/${ingredient}?glutenFree=${glutenInput}&dairyFree=${diaryInput}`,function(response){
        renderer.renderRecipes(response)
    })
}

$("#recipes").on('click','.image',function(){
    let recipe = $(this).siblings('ul').find('li:first').text()
    alert('First Ingredient: ' + recipe)
})
