import axios from 'axios';
import * as urls from '../urls';
import * as actionTypes from './actionTypes';

export const getAllReports = (body) => (dispatch) => {
  axios
    .post(urls.GET_ALL_REPORTS, body)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: actionTypes.GET_ALL_REPORTS, data: res.data });
    })
    .catch((err) => {
      dispatch({ type: 'Error', error: err });
    });
};
