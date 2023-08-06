import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allReports: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_REPORTS:
      return {
        ...state,
        allReports: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
