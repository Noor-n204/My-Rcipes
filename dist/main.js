
const renderer = new Renderer()


const searchRecipes = function(){
    let ingredient = $("#inputSearch").val()
    let diaryInput = $("#diary-ingredients")[0].checked   
    let glutenInput = $("#gluten-ingredients")[0].checked

    if(!ingredient){
        alert("Insert Ingredient")
    }

    $.get(`/recipes/${ingredient}?glutenFree=${glutenInput}&dairyFree=${diaryInput}`).then((response)=>{
        renderer.renderRecipes(response)})
        .catch((error)=>{
        alert(error.responseJSON.Error)
    })
}

$("#recipes").on('click','.image',function(){
    let recipe = $(this).siblings('ul').find('li:first').text()
    alert('First Ingredient: ' + recipe)
})
