const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/Pantry');
const User = require('../src/User');
const Recipe = require('../src/Recipe');
const recipeTestData = require('../test/Recipe-test-data');
const pantryTestData = require('../test/Pantry-test-data');


describe('Pantry', () => {
  let user, pantry, recipe1, recipe2;

  beforeEach(function() {
    user = new User(pantryTestData[0].id, pantryTestData[0].name, pantryTestData[0].pantry);
    pantry = new Pantry(user.pantry);
    recipe1 = new Recipe(recipeTestData[0].id, recipeTestData[0].image, recipeTestData[0].ingredients, recipeTestData[0].instructions, recipeTestData[0].name, recipeTestData[0].tags);
    recipe2 = new Recipe(recipeTestData[1].id, recipeTestData[1].image, recipeTestData[1].ingredients, recipeTestData[1].instructions, recipeTestData[1].name, recipeTestData[1].tags);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
      expect(pantry).to.be.instanceOf(Pantry);
  });

  it('should have stocked ingredients', () => {
    expect(pantry.stockedIngredients).to.deep.equal(user.pantry)
  });
  
  it('should find the required ingredients for the recipe', () => {
    expect(pantry.findRequiredIngredients(recipe1)).to.deep.equal([  
      { id: 11477, amount: 3 },
      { id: 11297, amount: 4 },
      { id: 1082047, amount: 7 }]);
  })

  it('should be able to check if there are enough required ingredients', () => {
    expect(pantry.checkForRequiredIngredients(recipe1)).to.equal(true)
  });

  it('should return false if there are not enough required ingredients', () => {
    expect(pantry.checkForRequiredIngredients(recipe2)).to.equal(false)
  });

  it('should return an array of the missing ingredients if some are missing', () => {
    expect(pantry.provideMissingIngredients(recipe2)).to.deep.equal([
      "Ingredient ID - 11477: Amount - 1", "Ingredient ID - 11297: Amount - 1", "Ingredient ID - 1082047: Amount - 1" 
    ])
  });
});
