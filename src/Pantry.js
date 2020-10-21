class Pantry {
    constructor(stockedIngredients) {
        this.stockedIngredients = stockedIngredients;
    }

    findRequiredIngredients(recipe) {
      return recipe.ingredients.map(ingredient => {
          const ingredientsData = {};
          ingredientsData.id = ingredient.id;
          ingredientsData.amount = ingredient.quantity.amount;
          return ingredientsData
      })        
    }

    checkForRequiredIngredients(recipe) {
      let requiredIngredients = this.findRequiredIngredients(recipe)
      let ingredientAvailability;
      requiredIngredients.forEach(ingredient => {
        return this.stockedIngredients.forEach(item => {
          if (ingredient.id === item.ingredient && item.amount >= ingredient.amount) {
            ingredientAvailability = true;
          } else {
            ingredientAvailability = false;
          }
        })
      })
      return ingredientAvailability;
    }
    
    provideMissingIngredients(recipe) {
      let missingIngredients = []
      const requiredIngredients = this.findRequiredIngredients(recipe);
      requiredIngredients.forEach(ingredient => {
        this.stockedIngredients.forEach(stockItem => {          
          if ((ingredient.id == stockItem.ingredient) && (ingredient.amount > stockItem.amount)) {
            missingIngredients.push(`Ingredient ID - ${stockItem.ingredient}: Amount - ${ingredient.amount - stockItem.amount}`)
          }
        })
      })
      return missingIngredients
    }    
}

if (typeof module !== 'undefined') {
    module.exports = Pantry;
  }