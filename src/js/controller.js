import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { data, getData, searchData } from './model';
import recipeViews from './views/recipeViews';
import searchViews from './views/searchViews';
import listRecipesView from './views/listRecipesView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause
    recipeViews.renderSpinner();

    await getData(id);
    const recipe = data.state;
    recipeViews.renderRecipe(recipe);
  } catch (err) {
    // console.log(err.message);
    recipeViews.renderError(err.message);
  }
};

const controlSearchRecipe = async query => {
  try {
    // SEACH FOR RECIPE
    await searchData(query);
    // GUARD CLAUSE
    if (!query) throw new Error('Enter a recipe');

    listRecipesView.renderRecipe(data.search.result);
    // console.log(data.search.result);
  } catch (err) {
    recipeViews.renderError(err.message);
  }
};
// controlSearchRecipe('pizza');
const init = () => {
  recipeViews.handleRender(controlRecipe);
  searchViews.searchHandlerRender(controlSearchRecipe);
};

init();
