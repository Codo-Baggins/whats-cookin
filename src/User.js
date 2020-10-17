// const recipeData = require('../data/recipes');
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
// return all recipes containing ingredient being searched
// params of searchedIngredient and data of all ingredients
// search through all recipes in whatever array is passed
// look to see if recipes include required ingredient
// match id's to searchedIngredient
// push recipes containing id into array that is returned
    searchRecipesByIngredient(searchedIngredient, recipeList) {
        let ingredientID;
        let recipes = [];
        ingredientsData.forEach(ingredient => {
            if(searchedIngredient === ingredient.name) {
                ingredientID = ingredient.id;
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
        searchedName = searchedName.toLowerCase();
        return recipeList.filter(recipe => {
            return recipe.name.toLowerCase() === searchedName;
        })
    }
}

if (typeof module !== 'undefined') {
    module.exports = User;
  }
