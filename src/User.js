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
}

module.exports = User;