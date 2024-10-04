import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  data,
  getData,
  getSearchResultPage,
  searchData,
  updateServings,
} from './model';
import recipeViews from './views/recipeViews';
import searchViews from './views/searchViews';
import listRecipesView from './views/listRecipesView';
import paginationView from './views/paginationView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause
    recipeViews.renderSpinner();

    // update view
    listRecipesView.update(getSearchResultPage());

    // loading recipe
    await getData(id);
    const recipe = data.state;
    // render recipe
    recipeViews.render(recipe);
  } catch (err) {
    // console.log(err.message);
    recipeViews.renderError(err.message);
  }
};

const controlSearchRecipe = async query => {
  try {
    // SEACH FOR RECIPE
    listRecipesView.renderSpinner();
    await searchData(query);
    // GUARD CLAUSE
    if (!query) throw new Error('Enter a recipe');

    listRecipesView.render(getSearchResultPage(1));
    paginationView.render(data.search.result);
  } catch (err) {
    console.log(err);
    listRecipesView.renderError(err.message);
  }
};

const controlPagination = goTo => {
  console.log(goTo);
  listRecipesView.render(getSearchResultPage(goTo));
  paginationView.render(data.search.result);
};

const controlServings = function (newServings) {
  // UPDAT STATE
  updateServings(newServings);

  // UPDATE VIEW
  recipeViews.update(data.state);
};

const init = () => {
  recipeViews.handleRender(controlRecipe);
  recipeViews.handleServingsRender(controlServings);
  searchViews.searchHandlerRender(controlSearchRecipe);
  paginationView.handleRender(controlPagination);
};

init();
