import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { data, getData } from './model';
import recipeViews from './views/recipeViews';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
