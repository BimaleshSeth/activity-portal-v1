import * as actionTypes from "../actions/actionTypes";
import Notification from "../../Components/Notification/Notification";

const initialState = {
  facultiesToVerify: [],
  faculties: [],
  faculty: null,
  overview: { activity: 0 },
  adminOverview: {
    users: { faculty: 0, admin: 0, student: 0 },
    activity: 0,
    category: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FACULTY:
      return {
        ...state,
        faculties: action.data,
      };

    case actionTypes.SINGLE_FACULTY:
      return {
        ...state,
        faculty: action.data,
      };

    case actionTypes.GET_VERIFY_FACULTY:
      return {
        ...state,
        facultiesToVerify: action.data,
      };

    case actionTypes.OVERVIEW_FACULTY:
      return {
        ...state,
        overview: action.data,
      };

    case actionTypes.OVERVIEW_ADMIN:
      return {
        ...state,
        adminOverview: action.data,
      };

    case "Error":
      let message;
      console.log(action.error);
      if (action.error?.response?.data?.error) {
        message = action.error.response.data.error;
      } else {
        console.log(JSON.stringify(action.error, undefined, 3));
        message = action.error?.response?.data;
      }
      Notification(message, "danger");
      return state;
    case "Success":
      Notification(action.data, "success");
      return state;

    default:
      return state;
  }
};

export default reducer;
