import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const data = {
  state: {},
  search: {
    query: '',
    result: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
    page: 1,
  },
  bookmarks: [],
};

export const getData = async id => {
  try {
    const result = await getJSON(`${API_URL}/${id}`);

    const { recipe } = result.data;
    data.state = recipe;

    const isBookmarked = data.bookmarks.some(item => item.id === id);
    if (isBookmarked) data.state.bookmarked = true;
    else data.state.bookmarked = false;
  } catch (err) {
    // alert(err.message);
    throw err;
  }
};

export const searchData = async query => {
  try {
    data.search.query = query;
    let result = await getJSON(`${API_URL}?search=${query}`);
    result = result.data.recipes;
    // console.log(result);
    const recipes = result.map(res => {
      return {
        id: res.id,
        image: res.image_url,
        title: res.title,
        publisher: res.publisher,
      };
    });
    data.search.result = recipes;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = (page = data.search.page) => {
  data.search.currentPage = page;
  const start = (page - 1) * data.search.resultsPerPage;
  const end = page * data.search.resultsPerPage;

  return data.search.result.slice(start, end);
};

export const updateServings = newServings => {
  data.state.ingredients.forEach(item => {
    item.quantity = (+item.quantity * +newServings) / +data.state.servings;
  });
  data.state.servings = +newServings;
};

export const addBookmark = function (recipe) {
  data.bookmarks.push(recipe);
  if (recipe.id === data.state.id) data.state.bookmarked = true;
  saveBookmarks();
};

export const removeBookmark = function (id) {
  data.bookmarks = data.bookmarks.filter(bookmark => bookmark.id !== id);
  if (id === data.state.id) data.state.bookmarked = false;
  saveBookmarks();
};

export const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks));
};

export const getBookmarks = function () {
  const storage = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(storage);
  if (storage) data.bookmarks = storage;
};
getBookmarks();
