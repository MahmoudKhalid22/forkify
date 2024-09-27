import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { data, getData } from './model';
import recipeViews from './views/recipeViews';

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
    console.log(err.message);
  }
};

recipeViews.handleRender(controlRecipe);
