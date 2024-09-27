import { API_URL } from './config';
import { getJSON } from './helpers';

export const data = {
  state: {},
  search: {
    query: '',
    result: [],
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
