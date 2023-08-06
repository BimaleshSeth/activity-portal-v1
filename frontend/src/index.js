import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CRUD from "./Store/reducers/CRUD";
import activity from "./Store/reducers/activity";
import facultySection from "./Store/reducers/facultySection";
import studentSection from "./Store/reducers/studentSection";
import student from "./Store/reducers/student";
import faculty from "./Store/reducers/faculty";
import auth from "./Store/reducers/auth";
import reports from "./Store/reducers/reports";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

console.log(composeEnhancers);

const rootReducer = combineReducers({
  CRUD,
  activity,
  facultySection,
  studentSection,
  student,
  faculty,
  auth,
  reports,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
