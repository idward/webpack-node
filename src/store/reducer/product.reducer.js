const productReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TITLE':
      return {
        ...state,
        title: action.title
      };
    default:
      return state;
  }
};

export default productReducer;
