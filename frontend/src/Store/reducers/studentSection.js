import * as actionTypes from "../actions/actionTypes";

const initialState = {
  activityStatus: [],
  activityApproved: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STUDENT_ACTIVITY_STATUS:
      return {
        ...state,
        activityStatus: action.data,
      };

    case actionTypes.STUDENT_APPROVED_ACTIVITY:
      return {
        ...state,
        activityApproved: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
