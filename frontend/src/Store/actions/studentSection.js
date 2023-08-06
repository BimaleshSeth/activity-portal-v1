import axios from "axios";
import * as urls from "../urls";
import * as actionTypes from "./actionTypes";

const getStudentActivity = (dispatch) => {
  console.log("Called 1");
  axios
    .get(urls.STUDENT_ACTIVITY_STATUS)
    .then((res) => {
      dispatch({
        type: actionTypes.STUDENT_ACTIVITY_STATUS,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getActivityStudentStatus = () => (dispatch) => {
  getStudentActivity(dispatch);
};

export const enrollActivity = (body) => (dispatch) => {
  axios
    .post(urls.STUDENT_ENROLL_ACTIVITY, body)
    .then((res) => {
      dispatch({ type: "Success", data: res.data });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const reenrollActivity =
  ({ id, certificate }) =>
  (dispatch) => {
    axios
      .put(urls.STUDENT_REENROLL_ACTIVITY + id, { certificate })
      .then((res) => {
        getStudentActivity(dispatch);
      })
      .catch((err) => {
        dispatch({ type: "Error", error: err });
      });
  };

export const cancelActivity = (id) => (dispatch) => {
  axios
    .delete(urls.STUDENT_CANCEL_ACTIVITY + id)
    .then((res) => {
      getStudentActivity(dispatch);
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getApprovedActivity = () => (dispatch) => {
  axios
    .get(urls.STUDENT_APPROVED_ACTIVITY)
    .then((res) => {
      //   console.log(res.data);
      dispatch({ type: actionTypes.STUDENT_APPROVED_ACTIVITY, data: res.data });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};
