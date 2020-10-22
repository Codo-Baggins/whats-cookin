//~~~~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~~~~~~~~~~

const usersDropDown = document.querySelector('.users');

const recipesSection = document.querySelector('.displayed-recipes');

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

let currentUser, currentPantry;

function createUsers() {
  let userNames = usersData.map(user => {
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

function selectUser(event) {
  let userName = event.target.value;
  titleDisplay.innerText = `What's Cookin, ${userName}?`;
  usersData.forEach(user => {
    if (userName === user.name) {
      currentUser = new User(user.id, user.name, user.pantry)
      currentPantry = new Pantry (currentUser.pantry);
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
  return displayRecipes(filteredRecipes, recipesSection);
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
  recipeList.forEach(recipe => {
    let userHasIngredients = currentPantry.checkForRequiredIngredients(recipe, currentUser)
    let recipeClasses = `recipe ${userHasIngredients && "recipe-has-ingredients"}`

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
  let filteredRecipesByName = currentUser.searchRecipesByName(searchInput.value, recipeData)
  let filteredRecipesByIngredient = currentUser.searchRecipesByIngredient(searchInput.value, recipeData)
  clearDisplayedRecipes();
  displayRecipes(filteredRecipesByIngredient, recipesSection)
  return displayRecipes(filteredRecipesByName, recipesSection);
}

function bindToCookToggleButtons() {
  let buttons = document.querySelectorAll('[data-to-cook-id]');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      let recipeIdToToggle = e.target.getAttribute("data-to-cook-id")
      e.target.classList.toggle('selected');
      toggleRecipeFromToCook(recipeIdToToggle);
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
      toggleRecipeFromFavorites(recipeIdToToggle);
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
  changeClassList(favoritesSection, recipesSection, toCookSection, recipeSection);
  displayRecipes(userFavorites, favoritesSection);
}

function changeClassList(section1, section2, section3, section4) {
  section1.classList.remove('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
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
  changeClassList(toCookSection, recipeSection, favoritesSection, recipesSection,);
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
        <p>Instructions: ${currentRecipe.returnInstructions()}</p>
        <p>Estimated cost: $${currentRecipe.calculateRecipeCost(currentRecipe.ingredients, ingredientsData)}</p>
        <p> User Can Make: ${currentPantry.checkForRequiredIngredients(currentRecipe)}</p>
        <p> Missing Ingredients: ${currentPantry.provideMissingIngredients(currentRecipe)}</p>
      `
      changeClassList(recipeSection, favoritesSection, recipesSection, toCookSection);
    })
  })
}
