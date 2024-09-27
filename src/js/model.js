import { API_URL } from './config';
import { getJSON } from './helpers';

export const data = {
  state: {},
};

export const getData = async id => {
  try {
    const result = await getJSON(`${API_URL}/${id}`);

    const { recipe } = result.data;
    data.state = recipe;
  } catch (err) {
    alert(err.message);
  }
};
