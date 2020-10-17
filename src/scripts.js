
//const userData = require('../data/users');

//const recipeData = require("../data/recipes");
//const Recipe = require("./Recipe");

//let usersData = require("../data/users");

//~~~~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~~~~~~~~~~

const usersDropDown = document.querySelector('.users');

const recipesSection = document.querySelector('.displayed-recipes');

//const selcted = document.querySelector('.selected');
const titleDisplay = document.querySelector('.title-display');

//~~~~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~~~~~~~~~~~

window.addEventListener('load', handleLoad);
usersDropDown.addEventListener('change', selectUser);


function handleLoad() {
  loadUsers();
  displayRecipes();
}
//~~~~~~~~~~~~~~~~~~~~~~~
//const Pantry = require('../src/Pantry');
// const User = require('../src/User');
// const Recipe = require('../src/Recipe');
//const usersData = require('../data/users');

let currentUser;

function createUsers() {
  let userNames = usersData.map(user => {
    //console.log(user.name)
    return user.name;
  })
  return userNames;
}
  
function loadUsers() {
    let users = createUsers();
     console.log(users);
      users.forEach(user => {
      return usersDropDown.innerHTML += `<option value="${user}">${user}</option>`
  })
}

//update display to show name
// instantiate user based on name
function selectUser(event) {
  let userName = event.target.value
  titleDisplay.innerText = `What's Cookin, ${userName}?`
  usersData.forEach(user => {
    if (userName === user.name) {
      currentUser = new User(user.id, user.name, user.pantry)
    }
    //return currentUser
  })
  return currentUser;
}

function createRecipes() {
  let collectedRecipes = [];
  recipeData.forEach(recipe => {
    let displayedRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
      return collectedRecipes.push(displayedRecipe);
  })
  return collectedRecipes;
}

function displayRecipes() {
  let recipes = createRecipes();
  //console.log(recipes);
  recipes.forEach(recipe => {
    let userHasIngredients = false;
    // let userHasIngredients = pantry.checkForRequiredIngredients(recipe, user)
    let recipeClasses = `recipe ${userHasIngredients && "recipeHasIngredients"}`
   return recipesSection.innerHTML += 
    `<div class="${recipeClasses}">
      <img class="recipe-image" src="${recipe.image}">
      <form class="recipe-options">
        <input type="checkbox" id="template-recipe" name="example-recipe" value="example-food">
        <button id="${recipe.name}" class="recipe-name">
          ${recipe.name}
        </button>
        <input type="checkbox">
      </form>
    </div>`
  })
}