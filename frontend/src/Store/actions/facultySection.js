import axios from "axios";
import * as urls from "../urls";
import * as actionTypes from "./actionTypes";

const getStudents = (body, dispatch) => {
  axios
    .post(urls.GET_FACULTY_ACTIVITY_STUDENT, body)
    .then((res) => {
      console.log("Student Fetched");
      dispatch({
        type: actionTypes.GET_FACULTY_ACTIVITY_STUDENT,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getActivityStudents = (body) => (dispatch) => {
  getStudents(body, dispatch);
};

export const getFacultyActivity = () => (dispatch) => {
  axios
    .get(urls.GET_FACULTY_ACTIVITY)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: actionTypes.GET_FACULTY_ACTIVITY, data: res.data });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const doFacultyActivityStudent = (body) => (dispatch) => {
  axios
    .post(urls.DO_FACULTY_ACTIVITY_STUDENT, body.do)
    .then((res) => {
      //   dispatch({
      //     type: actionTypes.GET_FACULTY_ACTIVITY_STUDENT,
      //     data: res.data,
      //   });
      getStudents(body.get, dispatch);
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};
