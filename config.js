const RECIPES_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'
const GIF_URL = 'https://api.giphy.com/v1/gifs/search?q=food&api_key=D1xDfP4O5HJN4E25Uu2WQs0gjw4gv5sU&limit=5'

const dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese"]
const glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"]

const sensitivities = {'gluten' : glutenIngredients,
                        'dairy' : dairyIngredients
                }

module.exports ={RECIPES_URL,GIF_URL, dairyIngredients, glutenIngredients,sensitivities}