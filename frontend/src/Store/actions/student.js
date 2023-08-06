import axios from "axios";
import * as urls from "../urls";
import * as actionTypes from "./actionTypes";

const getStudents = (body, dispatch, showAlert = false) => {
  axios
    .get(urls.GET_STUDENT + `${body.branchId}/${body.semesterId}`)
    .then((res) => {
      console.log("Student Fetched");
      dispatch({
        type: actionTypes.GET_STUDENT,
        data: res.data,
      });
      if (showAlert) {
        dispatch({
          type: "Success",
          data: "Students fetched successfully!",
        });
      }
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getStudent = (body) => (dispatch) => {
  getStudents(body, dispatch, true);
};

export const getSingleStudent = (studentId) => (dispatch) => {
  axios
    .get(urls.SINGLE_STUDENT + studentId)
    .then((res) => {
      console.log("sINGLE Student Fetched");
      dispatch({
        type: actionTypes.SINGLE_STUDENT,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getStudentOverview = () => (dispatch) => {
  axios
    .get(urls.OVERVIEW_STUDENT)
    .then((res) => {
      console.log("Student Overview Fetched");
      dispatch({
        type: actionTypes.OVERVIEW_STUDENT,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const createStudent = (body) => (dispatch) => {
  axios
    .post(urls.CREATE_STUDENT, body)
    .then((res) => {
      console.log(res.data);
      console.log("Student created");
      dispatch({
        type: actionTypes.CREATE_STUDENT,
        data: res.data,
      });
      dispatch({
        type: "Success",
        data: "Student has been created successfully!",
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const nextSemester = (body) => (dispatch) => {
  axios
    .post(urls.NEXT_SEMESTER, body)
    .then((res) => {
      console.log(res.data);
      getStudents(
        { branchId: body.branchId, semesterId: body.semesterId },
        dispatch
      );
      dispatch({
        type: "Success",
        data: "Students passed to next semester successfully!",
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const updateStudent =
  ({ studentId, update, get }) =>
  (dispatch) => {
    axios
      .put(urls.UPDATE_STUDENT + studentId, update)
      .then((res) => {
        console.log("Student updated");
        dispatch({
          type: actionTypes.UPDATE_STUDENT,
          data: res.data,
        });
        getStudents(get, dispatch);
        dispatch({
          type: "Success",
          data: "Student data has been updated successfully!",
        });
      })
      .catch((err) => {
        dispatch({ type: "Error", error: err });
      });
  };

export const deleteStudent =
  ({ studentId, get }) =>
  (dispatch) => {
    axios
      .delete(urls.DELETE_STUDENT + studentId)
      .then((res) => {
        console.log("Student deleted");
        dispatch({
          type: actionTypes.DELETE_STUDENT,
          data: res.data,
        });
        getStudents(get, dispatch);
      })
      .catch((err) => {
        dispatch({ type: "Error", error: err });
      });
  };

const getStudentToVerify = (body, dispatch) => {
  axios
    .post(urls.GET_VERIFY_STUDENT, body)
    .then((res) => {
      console.log("Get Student to verify");
      dispatch({
        type: actionTypes.GET_VERIFY_STUDENT,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getVerifyStudent = (body) => (dispatch) => {
  getStudentToVerify(body, dispatch);
};

export const verifyStudent =
  ({ studentId, get }) =>
  (dispatch) => {
    axios
      .put(urls.VERIFY_STUDENT + studentId)
      .then((res) => {
        console.log("Student verified");
        dispatch({
          type: actionTypes.VERIFY_STUDENT,
          data: res.data,
        });
        getStudentToVerify(get, dispatch);
      })
      .catch((err) => {
        dispatch({ type: "Error", error: err });
      });
  };
