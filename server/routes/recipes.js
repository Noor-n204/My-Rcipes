const errors =require('./errors')
const {faker} =require(`@faker-js/faker`)
const consts = require('../../config')
const sensitivesMap = consts.sensitivities
let currentPage = 0

class recipesController {

    getArrOfSenstivities(glutenFree, dairyFree){
        let arrSenstivities = []
        if(glutenFree === "true"){
            arrSenstivities.push('gluten')
        }
        if(dairyFree === "true"){
            arrSenstivities.push('dairy')
        }
        return arrSenstivities
    }
    
    checkIngrediants(ingrediant){
        
        if (!ingrediant.match(/^[a-z]+$/i) ) {
            throw new errors.InvalidIngredientError() 
        }
    }
    
    filtered(arr, GIF){
        
        const filteredArr = arr.map((recipe) =>{ let chef = faker.person.firstName()
                let rndRating = Math.floor(Math.random() * 5) + 1
                let rndGIF = Math.floor(Math.random()* GIF.length)
                return {idMeal : recipe.idMeal , title : recipe.title ,chef : chef, thumbnail : GIF[rndGIF].embed_url, rndRating : rndRating, href : recipe.href, ingredients: recipe.ingredients}})
        return filteredArr
    }

    filterRecipesBySenstivites(recipes,GIF, arrSenstivities){
        const filteredRecipes= this.filtered(recipes, GIF) 
        return filteredRecipes.filter((recipe)=> !this.isContainingSensntivites(arrSenstivities,recipe))
    }

    isContainingSensntivites = (arrSenstivities,recipe) => {
            for(let ingredient of recipe.ingredients){
                const ingredientLowerCase = ingredient.toLowerCase()
                if(this.isIngredientContainSensntivity(ingredientLowerCase,arrSenstivities)){
                    return true
                }
            }
            return false
    }

    isIngredientContainSensntivity = (ingredient, arrSenstivities) => {
        for(let sesntivity of arrSenstivities){
            if(sensitivesMap[sesntivity].includes(ingredient)){
                return true
            }
        }
        return false
    }

    paginatedResults(move, recipes){
        const limit = 5
        let Newrecipes = []
        const startIndex = currentPage * limit
        const endIndex = currentPage * limit

        if(move == "next" & endIndex<recipes.length){
            currentPage++
            Newrecipes = recipes.slice(currentPage*limit, currentPage*limit+ limit)
        }

        if(move == "previous" & startIndex>0){
            currentPage--
            Newrecipes = recipes.slice(currentPage*limit, currentPage*limit+ limit)
        }
        return Newrecipes
    }
}

module.exports = {recipesController}