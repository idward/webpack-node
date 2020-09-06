export const fetchTitleSuccess = (title) => {
  return {
    type: 'GET_TITLE',
    title
  };
};

export const fetchTitleFail = (error) => {
  return {
    type: 'GET_TITLE_FAIL',
    error
  };
};

export const fetchTitleAsyn = (title) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/product/${title}`);
    const result = await response.json();
    return dispatch(fetchTitleSuccess(result.title));
  } catch (err) {
    console.log(err);
    return dispatch(fetchTitleFail(err));
  }
};
