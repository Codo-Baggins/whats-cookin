class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  calculateRecipeCost(ingredients, ingredientsData) {
    let totalCost = 0;
    ingredients.forEach(ingredient => {
      ingredientsData.find(requiredIngredient => {
        if (requiredIngredient.id === ingredient.id) {
          totalCost = (totalCost + requiredIngredient.estimatedCostInCents * ingredient.quantity.amount);
          return totalCost;
        }
      });
    });
    return totalCost/100;
  }

  returnInstructions() {
    return this.instructions;
  }

  // provideIDAndAmount() {
  //   this.ingredients.reduce((requiredIngredients, ingredient) => {
  //     let newVariable = {};
  //     newVariable['id'] = ingredient.id
  //     newVariable['amount'] = ingredient.quantity.amount
  //     return requiredIngredients.push(newVariable);
  //   }, [])
  // }
}

module.exports = Recipe;
