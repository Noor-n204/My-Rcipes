const express = require('express')
const axios = require('axios')
const errors =require('./errors')

const filterRecipes = require('./recipes')
const recipesController = new filterRecipes.recipesController()
 
const router = express.Router()

const RECIPES_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'

router.get('/', function(req, res){
    res.end()
})

router.get('/recipes/:ingredient', function(req, res){
    const ingredient = req.params.ingredient
    const glutenFree = req.query.glutenFree
    const dairyFree = req.query.dairyFree

    try {
        recipesController.checkIngrediants(ingredient)
        
    } catch (error) {

        if(error instanceof errors.InvalidIngredientError){
            res.status(409).send({"Error": `${ingredient} is not a valid ingrediant`})
            return
        }
        
    }

    axios.get(RECIPES_URL + ingredient)
    .then((result)=>{
        const recipes= recipesController.filterRecipes(result.data.results, glutenFree, dairyFree)                                                                          
    

    res.json(recipes)})
})

module.exports = router