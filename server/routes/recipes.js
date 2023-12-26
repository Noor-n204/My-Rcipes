const errors =require('./errors')
const {faker} =require(`@faker-js/faker`)
const consts = require('../../config')
const sensitivesMap = consts.sensitivities

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
    
    filtered(arr){
        
        const filteredArr = arr.map((recipe) =>{ let chef = faker.person.firstName()
                let rndInt = Math.floor(Math.random() * 5) + 1
                return {idMeal : recipe.idMeal , title : recipe.title ,chef : chef, thumbnail : recipe.thumbnail, rndInt : rndInt, href : recipe.href, ingredients: recipe.ingredients}})
        return filteredArr
    }

    filterRecipesBySenstivites(recipes, arrSenstivities){
        const filteredRecipes= this.filtered(recipes) 
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
}

module.exports = {recipesController}