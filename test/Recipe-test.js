const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe');
const ingredientsData = require('../data/ingredients');

describe('User', () => {
  let recipe;
  
  beforeEach(function() {
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
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of the recipe class', () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.equal(17);
  });

  it('should have an image', () => {
    expect(recipe.image).to.equal('string of image');
  });

  it('should have a list of ingredients', () => {
    expect(recipe.ingredients).to.deep.equal([{
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
    }]);
  });
// maybe test for keys within the objects

  it('should have a list of instructions', () => {
    expect(recipe.instructions).to.deep.equal([{
      instruction: 'mix rice with salt', 
      number: 1
    }, {
      instruction: 'do not eat', 
      number: 2
    }]);
  });

  it('should have a name', () => {
      expect(recipe.name).to.equal('paella');
  });

  it('should have a list of tags', () => {
    expect(recipe.tags).to.deep.equal([
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ]);
  });

  // to be updated
  it('should calculate the cost of the recipe', () => {
    const ingredientsCost = recipe.calculateRecipeCost(recipe.ingredients, ingredientsData)

    expect(ingredientsCost).to.equal(5.04)
  });

  it('should provide necessary instructions', () => {
    recipe.returnInstructions();

    expect(recipe.instructions).to.deep.equal([{
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
    ])
  })
});