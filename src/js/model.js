export const data = {
  state: {},
};

export const getData = async id => {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    const { recipe } = result.data;
    data.state = recipe;
  } catch (err) {
    alert(err.message);
  }
};
