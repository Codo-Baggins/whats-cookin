const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const Recipe = require('../src/Recipe');
const recipeData = require('../data/recipes');
const ingredientsData = require('../data/ingredients');

describe('User', () => {
    let user, recipe, recipe2;
    beforeEach(function() {
        user = new User(10010, 'Aaron', ['cheese', 'crackers']);
        recipe = new Recipe(17, 'string of image', [{
            "id": 20081,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          }, 
          {
            "id": 18372,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          }], [{
            instruction: 'mix rice with salt', 
            number: 1
          }, {
            instruction: 'do not eat', 
            number: 2
          }], 'paella', [
            "antipasti",
            "starter",
            "snack",
            "appetizer",
            "antipasto",
            "hor d'oeuvre"
          ]);

          recipe2 = new Recipe(34, 'string of image', [{
            "id": 19335,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          }, 
          {
            "id": 1123,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          }], [{
            instruction: 'mix rice with salt', 
            number: 1
          }, {
            instruction: 'do not eat', 
            number: 2
          }], 'turducken', [
            'lunch', 
            'entree', 
            'dinner'
          ]);
    });

    it('should be a function', () => {
        expect(User).to.be.a('function');
    });

    it('should be an instance of User', () => {
        expect(user).to.be.instanceOf(User);
    });

    it('should have an id', () => {
        expect(user.id).to.equal(10010);
    });

    it('should have a name', () => {
        expect(user.name).to.equal('Aaron');
    });

    it('should have a pantry', () => {
        expect(user.pantry).to.deep.equal(['cheese', 'crackers']);
    });

    it('should have no favorite recipes by default', () => {
        expect(user.favoriteRecipes).to.deep.equal([]);
    });

    it('should have no recipes to cook by default', () => {
        expect(user.recipesToCook).to.deep.equal([]);
    });

    it('should be able to add a recipe to favorite\'s', () => {
        user.addToFavorites('cookies');
        user.addToFavorites('banana bread');

        expect(user.favoriteRecipes).to.deep.equal(['cookies', 'banana bread']);
    })

    it('should be able to remove a recipe from favorite\'s', () => {
        user.addToFavorites('cookies');
        user.addToFavorites('banana bread');
        user.addToFavorites('apple pie');

        user.removeFromFavorites('banana bread')

        expect(user.favoriteRecipes).to.deep.equal(['cookies', 'apple pie']);
    })

    it('should be able to add a recipe to our list of recipes to cook', () => {
        user.addToRecipesToCook('meatballs');
        user.addToRecipesToCook('spaghetti');

        expect(user.recipesToCook).to.deep.equal(['meatballs', 'spaghetti']);
    })

    it('should be able to remove a recipe from our list of recipes to cook', () => {
        user.addToRecipesToCook('meatballs');
        user.addToRecipesToCook('spaghetti');
        user.addToRecipesToCook('garlic bread');

        user.removeFromRecipesToCook('spaghetti');

        expect(user.recipesToCook).to.deep.equal(['meatballs', 'garlic bread']);
    })

    it('should be able to filter recipes by tag', () => {
        user.addToFavorites(recipe);
        user.addToFavorites(recipe2);

        expect(user.filterRecipesByTag('lunch', user.favoriteRecipes)).to.deep.equal([recipe2]);
    });

    it('should be able to search recipes based on ingredient', () => {
        user.addToFavorites(recipe);
        user.addToFavorites(recipe2);

        expect(user.searchRecipesByIngredient('eggs', user.favoriteRecipes)).to.deep.equal([recipe2]);
    });

    it('should be able to search recipes based on name', () => {
        user.addToFavorites(recipe);
        user.addToFavorites(recipe2);

        expect(user.searchRecipesByName('paella', user.favoriteRecipes)).to.deep.equal([recipe]);
    })
});