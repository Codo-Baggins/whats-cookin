// to run and pass tests uncomment line 3

// const ingredientsData = require('../data/ingredients');

class User {
    constructor(id, name, pantry) {
        this.id = id;
        this.name = name;
        this.pantry = pantry;
        this.favoriteRecipes = [];
        this.recipesToCook = [];
    }

    addToFavorites(recipe) {
        this.favoriteRecipes.push(recipe);
    }

    removeFromFavorites(recipe) {
        let index = this.favoriteRecipes.indexOf(recipe);
        this.favoriteRecipes.splice(index, 1)
    }

    addToRecipesToCook(recipe) {
        this.recipesToCook.push(recipe);
    }

    removeFromRecipesToCook(recipe) {
        let index = this.recipesToCook.indexOf(recipe);
        this.recipesToCook.splice(index, 1)
    }

    filterRecipesByTag(tag, recipeList) {
        return recipeList.filter(recipe => {
            return recipe.tags.includes(tag);
        });
    }

    searchRecipesByIngredient(searchedIngredient, recipeList) {
        let ingredientID;
        let ingredientName;
        let recipes = [];
        ingredientsData.forEach(ingredient => {
            if(searchedIngredient === ingredient.name) {
                ingredientID = ingredient.id;
                ingredientName = ingredient.name;
            }
        });
        recipeList.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if (ingredientID === ingredient.id) {
                    recipes.push(recipe)
                }
            })
        });
        return recipes;
    }

    searchRecipesByName(searchedName, recipeList) {
        let foundRecipes = [];
        searchedName = searchedName.toLowerCase();
        recipeList.forEach(recipe => {
            let recipeName = recipe.name.toLowerCase();
            if (recipeName.includes(searchedName)) {
                foundRecipes.push(recipe)
            }
        })
        return foundRecipes;
    }
}

if (typeof module !== 'undefined') {
    module.exports = User;
  }
