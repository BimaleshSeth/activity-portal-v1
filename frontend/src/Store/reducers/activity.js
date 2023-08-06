import * as actionTypes from "../actions/actionTypes";

const initialState = {
  activityDocs: [],
  activities: [],
  activityFaculties: [],
  branchWithFaculty: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACTIVITY_DOC:
      return {
        ...state,
        activityDocs: action.data,
      };

    case actionTypes.GET_ACTIVITY_BY_CATEGORY:
      return {
        ...state,
        activities: action.data,
      };

    case actionTypes.GET_ACTIVITY_FACULTY:
      return {
        ...state,
        activityFaculties: action.data.Faculties,
      };

    case actionTypes.GET_BRANCH_WITH_FACULTY:
      return {
        ...state,
        branchWithFaculty: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
