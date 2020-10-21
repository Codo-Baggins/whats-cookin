
//const userData = require('../data/users');

// const Recipe = require("./Recipe");

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

const favoriteButton = document.querySelector('.favorites-button');
const toCookButton = document.querySelector('.to-cook-button');
const favoritesSection = document.querySelector('.favorite-section');
const toCookSection = document.querySelector('.to-cook-section');

const recipeSection = document.querySelector('.displayed-recipe');


//~~~~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~~~~~~~~~~~

window.addEventListener('load', handleLoad);
usersDropDown.addEventListener('change', selectUser);
tagsDropDown.addEventListener('change', selectTag);

searchButton.addEventListener('click', searchRecipes);

favoriteButton.addEventListener('click', displayFavoriteRecipes);
toCookButton.addEventListener('click', displayToCookRecipes)

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function handleLoad() {
  loadUsers();
  createRecipes(recipeData);
}
//~~~~~~~~~~~~~~~~~~~~~~~
//const Pantry = require('../src/Pantry');
// const User = require('../src/User');
// const Recipe = require('../src/Recipe');
//const usersData = require('../data/users');

let currentUser, currentPantry;

function createUsers() {
  let userNames = usersData.map(user => {
    //console.log(user.name)
    return user.name;
  })
  return userNames;
}

function loadUsers() {
  let users = createUsers();
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
  })
  loadTags();
  displayRecipes(recipeData, recipesSection);
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

function displayRecipes(recipeList, recipeLocation) {
  //let recipes = createRecipes(recipeList);
  //console.log(recipes);
  recipeList.forEach(recipe => {
    let userHasIngredients = false;
    //let userHasIngredients = currentPantry.checkForRequiredIngredients(recipe, user)
    let recipeClasses = `recipe ${userHasIngredients && "recipeHasIngredients"}`

    recipeLocation.innerHTML += `
    <div class="${recipeClasses}">
      <img class="recipe-image" src="${recipe.image}">
      <section class="recipe-options">
        <button 
          class="add-to-recipe-book" 
          data-to-cook-id="${recipe.id}"
        >
        </button>
        <button id="${recipe.name}" data-recipe-id="${recipe.id}"
        class="recipe-name">
          ${recipe.name}
        </button>
        <button 
          class="add-to-favorites" 
          data-favorite-id="${recipe.id}"
        />
      </section>
      </div>
    `
  })
  bindToCookToggleButtons();
  bindFavoriteToggleButtons();
  bindShowRecipeButtons();
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

function bindToCookToggleButtons() {
  let buttons = document.querySelectorAll('[data-to-cook-id]');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      let recipeIdToToggle = e.target.getAttribute("data-to-cook-id")
      e.target.classList.toggle('selected');
      console.log('Recipe has been toggled', recipeIdToToggle)
      toggleRecipeFromToCook(recipeIdToToggle);
      console.log('to cook recipes', currentUser.recipesToCook)
    })
  })
}

function toggleRecipeFromToCook(recipeId) {
  if (currentUser.recipesToCook.includes(recipeId)) {
    currentUser.removeFromRecipesToCook(recipeId);
  } else {
    currentUser.addToRecipesToCook(recipeId);
  } 
}

function bindFavoriteToggleButtons() {
  let buttons = document.querySelectorAll('[data-favorite-id]');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      let recipeIdToToggle = e.target.getAttribute("data-favorite-id")
      e.target.classList.toggle('selected');
      console.log('Recipe has been toggled', recipeIdToToggle)
      toggleRecipeFromFavorites(recipeIdToToggle);
      console.log('Favorite recipes', currentUser.favoriteRecipes)
    })
  })
}

function toggleRecipeFromFavorites(recipeId) {
  if (currentUser.favoriteRecipes.includes(recipeId)) {
    currentUser.removeFromFavorites(recipeId);
  } else {
    currentUser.addToFavorites(recipeId);
  } 
}

function displayFavoriteRecipes() {
  let userFavorites = [];
  currentUser.favoriteRecipes.forEach(number => {
    recipeData.forEach(recipe => {
      if (recipe.id == number) {
        userFavorites.push(recipe);
      }
    })
  })
  showFavoriteListSection();
  displayRecipes(userFavorites, favoritesSection);
}

function showRecipeListSection() {
  favoritesSection.classList.add('hidden');
  recipesSection.classList.remove('hidden');
  toCookSection.classList.add('hidden');
  recipeSection.classList.add('hidden');
}

function showFavoriteListSection() {
  favoritesSection.classList.remove('hidden');
  recipesSection.classList.add('hidden');
  toCookSection.classList.add('hidden');
  recipeSection.classList.add('hidden');
}

function showToCookSection() {
  favoritesSection.classList.add('hidden');
  recipesSection.classList.add('hidden');
  toCookSection.classList.remove('hidden');
  recipeSection.classList.add('hidden');
}

function showRecipeSection() {
  favoritesSection.classList.add('hidden');
  recipesSection.classList.add('hidden');
  toCookSection.classList.add('hidden');
  recipeSection.classList.remove('hidden');
}

function displayToCookRecipes() {
  let userToCook = [];
  currentUser.recipesToCook.forEach(number => {
    recipeData.forEach(recipe => {
      if (recipe.id == number) {
        userToCook.push(recipe);
      }
    })
  })
  showToCookSection();
  displayRecipes(userToCook, toCookSection);
}

function bindShowRecipeButtons() {
  let buttons = document.querySelectorAll('[data-recipe-id]');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      let recipeIdToShow = e.target.getAttribute("data-recipe-id")
      let recipe = recipeData.find(recipeToFind => recipeToFind.id == recipeIdToShow)
      let currentRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
      recipeSection.innerHTML = `
        <p>${currentRecipe.name}</p>
        <p>${currentRecipe.returnInstructions()}</p>
      `
      console.log(currentRecipe.returnInstructions())
      showRecipeSection();
    })
  })
}
