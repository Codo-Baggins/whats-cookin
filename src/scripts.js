
//const userData = require('../data/users');

//const recipeData = require("../data/recipes");
//const Recipe = require("./Recipe");

//let usersData = require("../data/users");

//~~~~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~~~~~~~~~~

const usersDropDown = document.querySelector('.users');

const recipesSection = document.querySelector('.displayed-recipes');

//~~~~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~~~~~~~~~~~

window.addEventListener('load', handleLoad);



function handleLoad() {
  loadUsers();
  displayRecipes();
}
//~~~~~~~~~~~~~~~~~~~~~~~

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
      return usersDropDown.innerHTML += `<option value=${user}>${user}</option>`
  })
}

// function selectUser() {
  
// }

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
  console.log(recipes);
  recipes.forEach(recipe => {
   return recipesSection.innerHTML += 
    `<div class="recipe">
      <img class="recipe-image" src="${recipe.image}">
      <form class="recipe-options">
        <input type="checkbox" id="template-recipe" name="example-recipe" value="example-food">
        <button id="${recipe.name}">
          ${recipe.name}
        </button>
        <input type="checkbox">
      </form>
    </div>`
  })
}