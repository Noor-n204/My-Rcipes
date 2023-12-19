const express = require('express')
const axios = require('axios')
const router = express.Router()

const RECIPES_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'

dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese"]
glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"]



const filtered = function(arr){
    const filteredArr = arr.map((recipe) =>{return {idMeal : recipe.idMeal , title : recipe.title , thumbnail : recipe.thumbnail, href : recipe.href, ingredients: recipe.ingredients}})
    return filteredArr
}

const filterGlutenFree = function(recipes){
    const glutenFreeArray =[]
    for(let i=0 ; i<recipes.recipes.length; i++)
    {

        const ingredients = recipes.recipes[i].ingredients.map(ingredient => ingredient.toLowerCase())
        const contains = ingredients.some(element => {
        return glutenIngredients.indexOf(element) !== -1;
        })

        if(!contains){
            glutenFreeArray.push(recipes.recipes[i])
        }
    }
    recipes.recipes = glutenFreeArray
}

const filterDairyFree = function(recipes){
    const dairyFreeArray = []
    for(let i=0 ; i<recipes.recipes.length; i++)
    {
        const ingredients = recipes.recipes[i].ingredients.map(ingredient => ingredient.toLowerCase())
        const contains = ingredients.some(element => {
        return dairyIngredients.indexOf(element) !== -1;
        })

        if(!contains){
            dairyFreeArray.push(recipes.recipes[i])
        }
    }
    recipes.recipes = dairyFreeArray
}

router.get('/', function(req, res){
    res.end()
})

router.get('/recipes/:ingredient', function(req, res){
    const ingredient = req.params.ingredient
    const glutenFree = req.query.glutenFree
    const dairyFree = req.query.dairyFree
    
    axios.get(RECIPES_URL + ingredient)
    .then((result)=>{const recipes= {recipes :filtered(result.data.results) }                                                                           
    if(glutenFree=== "true"){
        filterGlutenFree(recipes)
    }
    if(dairyFree === "true"){
        filterDairyFree(recipes)
    }
    res.json(recipes)})
})

module.exports = router