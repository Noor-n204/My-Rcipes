const express = require('express')
const axios = require('axios')
const errors =require('./errors')
const consts = require('../../config')
const filterRecipes = require('./recipes')


const RECIPES_URL = consts.RECIPES_URL
const recipesController = new filterRecipes.recipesController()
 

const router = express.Router()

router.get('/', function(req, res){
    res.end()
})

router.get('/recipes/:ingredient', function(req, res){
    const ingredient = req.params.ingredient
    const glutenFree = req.query.glutenFree
    const dairyFree = req.query.dairyFree




    let arrSenstivities = recipesController.getArrOfSenstivities(glutenFree, dairyFree)

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
        const recipes= recipesController.filterRecipesBySenstivites(result.data.results, arrSenstivities)                                                                          
    

    res.json(recipes)})
})

module.exports = router