import axios from "axios";
import * as urls from "../urls";
import * as actionTypes from "./actionTypes";

const getFaculties = (body, dispatch) => {
  axios
    .get(urls.GET_FACULTY + `${body.branchId}`)
    .then((res) => {
      console.log("Faculty Fetched");
      dispatch({
        type: actionTypes.GET_FACULTY,
        data: res.data,
      });
      // dispatch({ type: "Success", data: "Faculties fetched successfully!" });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getFaculty = (body) => (dispatch) => {
  getFaculties(body, dispatch);
};

export const getSingleFaculty = (facultyId) => (dispatch) => {
  axios
    .get(urls.SINGLE_FACULTY + facultyId)
    .then((res) => {
      console.log("sINGLE Faculty Fetched");
      dispatch({
        type: actionTypes.SINGLE_FACULTY,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getFacultyOverview = () => (dispatch) => {
  axios
    .get(urls.OVERVIEW_FACULTY)
    .then((res) => {
      console.log("Faculty Overview Fetched");
      dispatch({
        type: actionTypes.OVERVIEW_FACULTY,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getAdminOverview = () => (dispatch) => {
  axios
    .get(urls.OVERVIEW_ADMIN)
    .then((res) => {
      console.log("admin Overview Fetched");
      dispatch({
        type: actionTypes.OVERVIEW_ADMIN,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const createFaculty = (body) => (dispatch) => {
  axios
    .post(urls.CREATE_FACULTY, body)
    .then((res) => {
      console.log(res.data);
      console.log("Faculty created");
      dispatch({
        type: actionTypes.CREATE_FACULTY,
        data: res.data,
      });
      dispatch({
        type: "Success",
        data: "Faculty has been created successfully!",
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const updateFaculty =
  ({ facultyId, update, get }) =>
  (dispatch) => {
    axios
      .put(urls.UPDATE_FACULTY + facultyId, update)
      .then((res) => {
        console.log("Faculty updated");
        dispatch({
          type: actionTypes.UPDATE_FACULTY,
          data: res.data,
        });
        getFaculties(get, dispatch);
        dispatch({
          type: "Success",
          data: "Faculty data has been updated successfully!",
        });
      })
      .catch((err) => {
        dispatch({ type: "Error", error: err });
      });
  };

export const deleteFaculty =
  ({ facultyId, get }) =>
  (dispatch) => {
    axios
      .delete(urls.DELETE_FACULTY + facultyId)
      .then((res) => {
        console.log("Faculty deleted");
        dispatch({
          type: actionTypes.DELETE_FACULTY,
          data: res.data,
        });
        getFaculties(get, dispatch);
        dispatch({
          type: "Success",
          data: "Faculty has been deleted successfully!",
        });
      })
      .catch((err) => {
        dispatch({ type: "Error", error: err });
      });
  };

const getFacultyToVerify = (body, dispatch) => {
  axios
    .post(urls.GET_VERIFY_FACULTY, body)
    .then((res) => {
      console.log("Get Faculty to verify");
      dispatch({
        type: actionTypes.GET_VERIFY_FACULTY,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getVerifyFaculty = (body) => (dispatch) => {
  getFacultyToVerify(body, dispatch);
};

export const verifyFaculty =
  ({ facultyId, get }) =>
  (dispatch) => {
    axios
      .put(urls.VERIFY_FACULTY + facultyId)
      .then((res) => {
        console.log("Faculty verified");
        dispatch({
          type: actionTypes.VERIFY_FACULTY,
          data: res.data,
        });
        getFacultyToVerify(get, dispatch);
      })
      .catch((err) => {
        dispatch({ type: "Error", error: err });
      });
  };
