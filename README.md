# [What's Cookin'?](https://codo-baggins.github.io/whats-cookin/)

- Contributors: 
  - Joe Lopez
  - Aaron Townsend

## Overview

- "What's Cookin'?" is an application that provides users with various recipes that they may want to cook!  Users can select from several different recipes, viewing the instructions and required ingredients in order to cook that recipe.  Users also have the ability to favorite a recipe and even bookmark recipes to cook them at a later time.  But wait, there's more...The application also allows users to compare the ingredients required to cook a recipe with the ingredients that they have in their personal pantries.  This tells the user whether or not they even have the ability to make the recipe before getting started.  

## Getting Started 

1. Fork the repo by clicking the "Fork" button in the top right corner of the page
2. Clone down your forked repo to your local machine by using the command `git clone [replace this with the SSH key for your repo]` in your terminal
3. `cd` into the cloned down directory on your local machine 
4. `cd` into the `src` directory and type `open index.html` into your terminal to open the application in your browser

## How to Navigate

1. Select a user from the dropdown menu on the top left.
    
2. What are you in the mood for?  Select a tag from the drop down menu on the right side of the page.  This will allow you to filter recipes by tags that are associated with each recipe

3. Can't find what you are looking for?  Type in a recipe or ingredient directly into the search bar on the left side of the page.  

![Choose user, tags, and search](/assets/user-tags-search.gif)<br />

4. Found some mouth-watering recipes?  Add them to your favorites by clicking on the heart in the lower right hand corner of the recipe!  

5. Don't have time to cook all of these recipes now?  It's okay!  We got you covered.  Go ahead and click on the "to-cook" icon in the lower left hand corner of the recipe to add it to to your list of recipes to cook later on.  

![Choose favorites and to Cook](/assets/favorite-to-cook.gif)<br />

6. Back from your long coding session and need some food to recharge your batteries?  Let's take a look at some of those recipes that we bookmarked earlier.  Click on the "Recipes to Cook" button in the top left corner of the webpage and select a recipe that sounds appetizing by clicking on the name of the recipe.  

7. Oh, no! the recipe says you don't have enough of the correct ingredients in order to cook the recipe.  Let's go back to the "Recipes To Cook" section and select a recipe with a bright green border around it.  

![Missing ingredients](/assets/missing-ingredient.gif)<br />

8.  Great, now that we have chosen a recipe that we have enough ingredients for, lets get cookin'! 

![Contains ingredients](/assets/contains-ingredient.gif)<br />

# Future Iterations

- The ability to create your own custom profile rather than being handed a pre-made profile
- The ability to save profile data to local storage
- A function that pulls ingredients from a user's pantry once a recipe has been cooked
- A featured recipe display on the homepage that cycles through 3 or 4 of the most popular recipes on the page
- Link to some API that has thousands of recipes, not just the stock ones provided here
