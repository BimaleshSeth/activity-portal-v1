import axios from "axios";
import * as urls from "../urls";
import * as actionTypes from "./actionTypes";

const getDocs = (id, dispatch) => {
  console.log("getDocs");
  axios
    .get(urls.GET_ACTIVITY_DOC + id)
    .then((res) => {
      dispatch({ type: actionTypes.GET_ACTIVITY_DOC, data: res.data });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getActivityByCategory = (id) => (dispatch) => {
  axios
    .get(urls.GET_ACTIVITY_BY_CATEGORY + id)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: actionTypes.GET_ACTIVITY_BY_CATEGORY, data: res.data });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getActivityDoc = (id) => (dispatch) => {
  console.log("getActivityDoc");
  getDocs(id, dispatch);
};

export const createActivityDoc = (body) => (dispatch) => {
  axios
    .post(urls.CREATE_ACTIVITY_DOC, body)
    .then((res) => {
      getDocs(body.activityDetailId, dispatch);
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const updateActivityDoc = (data) => (dispatch) => {
  axios
    .put(urls.UPDATE_ACTIVITY_DOC + data.id, data.body)
    .then((res) => {
      getDocs(data.body.activityDetailId, dispatch);
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const deleteActivityDoc = (data) => (dispatch) => {
  axios
    .delete(urls.DELETE_ACTIVITY_DOC + data.id)
    .then((res) => {
      getDocs(data.activityDetailId, dispatch);
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

const getFaculty = (id, dispatch) => {
  axios
    .get(urls.GET_ACTIVITY_FACULTY + id)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: actionTypes.GET_ACTIVITY_FACULTY, data: res.data });
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const getActivityFaculty = (id) => (dispatch) => {
  getFaculty(id, dispatch);
};

export const getBranchWithFaculty = () => (dispatch) => {
  axios
    .get(urls.GET_BRANCH_WITH_FACULTY)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: actionTypes.GET_BRANCH_WITH_FACULTY, data: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "Error", error: err });
    });
};

export const mapActivityWithFaculty = (body) => (dispatch) => {
  axios
    .post(urls.MAP_ACTIVITY_WITH_FACULTY, body)
    .then((res) => {
      getFaculty(body.activityDetailId, dispatch);
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};

export const deleteActivityFacultyMapping = (data) => (dispatch) => {
  console.log(data);
  axios
    .delete(urls.DELETE_ACTIVITY_FACULTY_MAPPING + data.id)
    .then((res) => {
      getFaculty(data.activityDetailId, dispatch);
    })
    .catch((err) => {
      dispatch({ type: "Error", error: err });
    });
};
