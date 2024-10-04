import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  addBookmark,
  data,
  getData,
  getSearchResultPage,
  removeBookmark,
  searchData,
  updateServings,
  uploadNewRecipe,
} from './model';
import recipeView from './views/recipeView';
import searchViews from './views/searchViews';
import listRecipesView from './views/listRecipesView';
import paginationView from './views/paginationView';
import bookmarklistView from './views/bookmarklistView';
import uploadRecipeView from './views/uploadRecipeView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause
    recipeView.renderSpinner();

    // update view
    listRecipesView.update(getSearchResultPage());
    // update bookmarklist
    bookmarklistView.update(data.bookmarks);

    // loading recipe
    await getData(id);
    const recipe = data.state;
    // render recipe
    recipeView.render(recipe);
  } catch (err) {
    // console.log(err.message);
    recipeView.renderError(err.message);
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
  recipeView.update(data.state);
};

const controlBookmark = function () {
  // 1) add or remove bookmark
  if (!data.state.bookmarked) addBookmark(data.state);
  else removeBookmark(data.state.id);
  // 2) update view
  recipeView.update(data.state);
  // 3) update bookmark list
  bookmarklistView.update(data.bookmarks);
};

const controlBookmarkList = function () {
  bookmarklistView.render(data.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    await uploadNewRecipe(newRecipe);
    // console.log(data.state);
    // 2) Render owned recipe
    recipeView.render(data.state);
    // 3) Render bookmark
    bookmarklistView.render(data.bookmarks);
  } catch (err) {
    uploadRecipeView.renderError(err.message);
  }
};

const init = () => {
  bookmarklistView.handleRender(controlBookmarkList);
  recipeView.handleRender(controlRecipe);
  recipeView.handleServingsRender(controlServings);
  recipeView.handleBookmarkRender(controlBookmark);
  searchViews.searchHandlerRender(controlSearchRecipe);
  paginationView.handleRender(controlPagination);
  uploadRecipeView.addHandlerRecipe(controlUploadRecipe);
};

init();
