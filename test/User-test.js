const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');

describe('User', () => {
    let user;

    beforeEach(function() {
        user = new User(10010, 'Aaron', ['cheese', 'crackers']);
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

});