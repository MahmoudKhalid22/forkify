import { API_URL } from './config';
import { getJSON } from './helpers';

export const data = {
  state: {},
  search: {
    query: '',
    result: [],
    resultsPerPage: 10,
    currentPage: 1,
  },
};

export const getData = async id => {
  try {
    const result = await getJSON(`${API_URL}/${id}`);

    const { recipe } = result.data;
    data.state = recipe;
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
