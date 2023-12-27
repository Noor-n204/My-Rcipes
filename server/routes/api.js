const express = require('express')
const axios = require('axios')
const errors =require('./errors')
const consts = require('../../config')
const filterRecipes = require('./recipes')


const RECIPES_URL = consts.RECIPES_URL
const GIF_URL = consts.GIF_URL
const recipesController = new filterRecipes.recipesController()
 

const router = express.Router()

router.get('/', function(req, res){
    res.end()
})

router.get('/recipes/:ingredient', function(req, res){
    const ingredient = req.params.ingredient
    const glutenFree = req.query.glutenFree
    const dairyFree = req.query.dairyFree
    const move = req.query.move
    let Newrecipes =[]
    
    let arrSenstivities = recipesController.getArrOfSenstivities(glutenFree, dairyFree)

    try {
        recipesController.checkIngrediants(ingredient)  
    } catch (error) {
        if(error instanceof errors.InvalidIngredientError){
            res.status(409).send({"Error": `${ingredient} is not a valid ingrediant`})
            return
        }
    }

    const recipesPromise = axios.get(RECIPES_URL + ingredient)
    const GIFpromise = axios.get(GIF_URL)

    Promise.all([recipesPromise, GIFpromise])
    .then((data)=>{
        var [recipeResult, GIFresult] = data
        const recipes= recipesController.filterRecipesBySenstivites(recipeResult.data.results,GIFresult.data.data, arrSenstivities)                                                                          
    
        Newrecipes = recipesController.paginatedResults(move, recipes)

    res.json(Newrecipes)})
})

module.exports = router