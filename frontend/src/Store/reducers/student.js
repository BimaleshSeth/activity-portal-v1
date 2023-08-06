import * as actionTypes from "../actions/actionTypes";

const initialState = {
  studentsToVerify: [],
  students: [],
  student: null,
  overview: { activity: 0, point: 0, fetched: false },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENT:
      return {
        ...state,
        students: action.data,
      };

    case actionTypes.SINGLE_STUDENT:
      return {
        ...state,
        student: action.data,
      };

    case actionTypes.GET_VERIFY_STUDENT:
      return {
        ...state,
        studentsToVerify: action.data,
      };
    case actionTypes.OVERVIEW_STUDENT:
      return {
        ...state,
        overview: {
          ...action.data,
          fetched: true,
        },
      };

    default:
      return state;
  }
};

export default reducer;
