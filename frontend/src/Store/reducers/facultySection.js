import * as actionTypes from "../actions/actionTypes";

const initialState = {
  activities: [],
  students: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FACULTY_ACTIVITY_STUDENT:
      return {
        ...state,
        students: action.data.Students,
      };

    case actionTypes.GET_FACULTY_ACTIVITY:
      return {
        ...state,
        activities: action.data.ActivityDetails,
      };

    default:
      return state;
  }
};

export default reducer;
