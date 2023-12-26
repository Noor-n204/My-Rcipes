const RECIPES_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'

const dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese"]
const glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"]

const sensitivities = {'gluten' : glutenIngredients,
                        'dairy' : dairyIngredients
                }

module.exports ={RECIPES_URL, dairyIngredients, glutenIngredients,sensitivities}