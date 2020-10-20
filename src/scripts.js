
//const userData = require('../data/users');

//const { filter } = require("../data/users");

//const recipeData = require("../data/recipes");

//const recipeData = require("../data/recipes");

//const recipeData = require("../data/recipes");
//const Recipe = require("./Recipe");

//let usersData = require("../data/users");

//~~~~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~~~~~~~~~~

const usersDropDown = document.querySelector('.users');

const recipesSection = document.querySelector('.displayed-recipes');

//const selcted = document.querySelector('.selected');
const titleDisplay = document.querySelector('.title-display');

const tagsDropDown = document.querySelector('.tags');

const searchInput = document.querySelector('.search-field');

const searchButton = document.querySelector('#search-button');

//~~~~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~~~~~~~~~~~

window.addEventListener('load', handleLoad);
usersDropDown.addEventListener('change', selectUser);
tagsDropDown.addEventListener('change', selectTag);

searchButton.addEventListener('click', searchRecipes);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function handleLoad() {
  loadUsers();
  createRecipes(recipeData);
  displayRecipes(recipeData);
  bindRecipeToggleButtons();
  //loadTags();
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
  let userName = event.target.value;
  titleDisplay.innerText = `What's Cookin, ${userName}?`;
  usersData.forEach(user => {
    if (userName === user.name) {
      currentUser = new User(user.id, user.name, user.pantry)
    }
    //return currentUser
  })
  loadTags();
  return currentUser;
}

function createUniqueTags() {
  let uniqueTags = recipeData.reduce((allTags, recipe) => {
    recipe.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
      })
      return allTags;
  }, [])
  return uniqueTags
}

function loadTags() {
  let uniqueTags = createUniqueTags();
  uniqueTags.forEach(uniqueTag => {
    return tagsDropDown.innerHTML += `<option value="${uniqueTag}">${uniqueTag.toUpperCase()}</option>`
  })
}

function selectTag(event) {
  let selectedTag = event.target.value;
  let filteredRecipes = currentUser.filterRecipesByTag(selectedTag, recipeData);
  clearDisplayedRecipes();
  return displayRecipes(filteredRecipes);
}

function createRecipes(recipeList) {
  let collectedRecipes = [];
  recipeList.forEach(recipe => {
    let displayedRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
      return collectedRecipes.push(displayedRecipe);
  })
  return collectedRecipes;
}

function displayRecipes(recipeList) {
  //let recipes = createRecipes(recipeList);
  //console.log(recipes);
  recipeList.forEach(recipe => {
    let userHasIngredients = false;
    // let userHasIngredients = pantry.checkForRequiredIngredients(recipe, user)
    let recipeClasses = `recipe ${userHasIngredients && "recipeHasIngredients"}`
   return recipesSection.innerHTML += 
    `<div class="${recipeClasses}">
      <img class="recipe-image" src="${recipe.image}">
      <section class="recipe-options">
        <button 
          class="add-to-recipe-book" 
          data-recipe-id="${recipe.id}"
        >
        </button>
        <button id="${recipe.name}" class="recipe-name">
          ${recipe.name}
        </button>
        <input 
          class="hidden favorite" 
          type="checkbox" 
          id="favorite-${recipe.name}" 
          name="favorite"
        />
      </section>
    </div>`
  })
}

function clearDisplayedRecipes() {
  recipesSection.innerHTML = '';
}

function searchRecipes() {
  //const searchInput = document.querySelector('.search-fields').value;
  let filteredRecipesByName = currentUser.searchRecipesByName(searchInput.value, recipeData)
  let filteredRecipesByIngredient = currentUser.searchRecipesByIngredient(searchInput.value, recipeData)
  clearDisplayedRecipes();
  displayRecipes(filteredRecipesByName);
  displayRecipes(filteredRecipesByIngredient)
}

function bindRecipeToggleButtons() {
  let buttons = document.querySelectorAll('[data-recipe-id]');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      let recipeIdToToggle = e.target.getAttribute("data-recipe-id")
      e.target.classList.toggle('selected');
      console.log('Recipe has been toggled', recipeIdToToggle)
      toggleRecipeFromFavorites(recipeIdToToggle);
      console.log('list of recipes is', currentUser.recipesToCook)
    })
  })
}

function toggleRecipeFromFavorites(recipeId) {
  if (currentUser.recipesToCook.includes(recipeId)) {
    currentUser.removeFromRecipesToCook(recipeId);
  } else {
    currentUser.addToRecipesToCook(recipeId);
  } 
}