class Pantry {
    constructor(stockedIngredients) {
        this.stockedIngredients = stockedIngredients;
    }


    // check the recipe amount by going into the recipe array 
    // match the desired recipe to the recipe id and 

    // capture recipe id 
    // check the user's pantry to see the amount of that id is in the users pantry
    // return id and amount from our recipe data to compare against

    
    // Look at ingredients inside of specified recipe
    // inside of the ingredients array, look at the id and the quantity.amount
    // match the user's pantry's ingredient to id && check if pantry amount is greater than recipe amount
    // if pantry amount is less than required in recipe, return unable to make this recipe
    // make sure user has ingredient?????

    // input: one recipe and user pantry
    // output: boolean value if one can make the recipe

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
      const groceryList = [];
      const requiredIngredients = this.findRequiredIngredients(recipe);
      requiredIngredients.forEach(ingredient => {
        return this.stockedIngredients.map(item => {
          if (ingredient.id === item.ingredient && ingredient.amount > item.amount) {
            const ingredientDetails = {};
            ingredientDetails.id = ingredient.id;
            ingredientDetails.amount = ingredient.amount - item.amount;    
            groceryList.push(ingredientDetails);
          }
        })
      })
      return groceryList;
    }    
}


if (typeof module !== 'undefined') {
    module.exports = Pantry;
  }