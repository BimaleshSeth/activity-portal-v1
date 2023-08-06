import React, { Component, useEffect } from "react";

import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useLocation,
} from "react-router-dom";
import * as actions from "./Store/actions";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Branch from "./Components/Branch/Branch";
import Degree from "./Components/Degree/Degree";
import NOA from "./Components/NOA/NOA";
import Category from "./Components/Category/Category";
import Semester from "./Components/Semester/Semester";
import Activity from "./Components/Activity/Activity";
import ActivityDoc from "./Components/ActivityDoc/ActivityDoc";
import ActivityFaculty from "./Components/ActivityFaculty/ActivityFaculty";
import ApprovedStudents from "./Components/FacultySection/ApprovedStudents/ApprovedStudents";
import PendingStudents from "./Components/FacultySection/PendingStudents/PendingStudents";
import RejectedStudents from "./Components/FacultySection/RejectedStudents/RejectedStudents";
import FacultyActivityDoc from "./Components/FacultySection/FacultyActivityDoc/FacultyActivityDoc";
import StudentActivityApply from "./Components/StudentSection/StudentActivityApply/StudentActivityApply";
import StudentActivityStatus from "./Components/StudentSection/StudentActivityStatus/StudentActivityStatus";
import StudentActivityApproved from "./Components/StudentSection/StudentActivityApproved/StudentActivityApproved";
import CreateStudent from "./Components/Student/CreateStudent";
import FetchStudent from "./Components/Student/FetchStudent";
import CreateFaculty from "./Components/Faculty/CreateFaculty";
import FetchFaculty from "./Components/Faculty/FetchFaculty";
import StudentDashboard from "./Components/Dashboard/Student";
import FacultyDashboard from "./Components/Dashboard/Faculty";
import SAdminDashboard from "./Components/Dashboard/SAdmin";
import ReportBySemester from './Components/Report/BySemester';
import $ from "jquery";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";
import myApp from "./Initial";
import Login from "./Components/Auth/Login";
import Logout from "./Components/Auth/Logout";
import axios from "axios";
import { connect } from "react-redux";
import Profile from "./Components/Profile/Profile";
import ErrorPage from "./Components/Error/ErrorPage";
import ChangePassword from "./Components/Password/ChangePassword";
import ResetPassword from "./Components/Password/ResetPassword";
import NextSemester from "./Components/Student/NextSemester";

// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.baseURL = 'https://activity-portal.herokuapp.com';

// console.log(axios.defaults.headers);
let authToken = null;
axios.interceptors.request.use(
  function (request) {
    if (authToken) {
      request.headers["x-auth-token"] = authToken;
    }
    console.log(request);
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class App extends Component {
  loadScript = () => {
    // const myScripts = [
    //   // "assets/js/libs/jquery-3.1.1.min.js",
    //   // "bootstrap/js/popper.min.js",
    //   // "bootstrap/js/bootstrap.min.js",
    //   "plugins/perfect-scrollbar/perfect-scrollbar.min.js",
    //   "assets/js/app.js",
    //   "plugins/highlight/highlight.pack.js",
    //   "assets/js/custom.js",
    //   "assets/js/scrollspyNav.js",
    //   "plugins/apex/apexcharts.min.js",
    //   "assets/js/dashboard/dash_1.js",
    //   "assets/js/ie11fix/fn.fix-padStart.js",
    //   "plugins/editors/quill/quill.js",
    //   "assets/js/apps/todoList.js",
    //   // "plugins/table/datatable/datatables.js",
    //   "assets/js/scrollspyNav.js",
    //   // "plugins/flatpickr/flatpickr.js",
    //   // "plugins/flatpickr/custom-flatpickr.js",
    //   // "plugins/select2/select2.min.js",
    //   // "plugins/noUiSlider/nouislider.min.js",
    //   // "plugins/noUiSlider/custom-nouiSlider.js",
    //   // "plugins/bootstrap-range-Slider/bootstrap-rangeSlider.js",
    // ];
    // myScripts.forEach((src) => {
    //   var tag = document.createElement("script");
    //   tag.async = false;
    //   tag.src = src;
    //   document.getElementsByTagName("body")[0].appendChild(tag);
    // });
    // this.props.history.listen((location, action) => {
    //   console.log(location);
    //   console.log(action);
    // });
  };

  componentDidMount() {
    console.log(this.props.location.pathname);
    this.props.userAutoLogin();
  }

  componentDidUpdate() {
    console.log(this.props.location.pathname);
  }

  render() {
    let rootRoute = <Route path='/' exact component={SAdminDashboard} />;

    if (this.props.user) {
      if (this.props.user.accessCode === "Student") {
        rootRoute = <Route path='/' exact component={StudentDashboard} />;
      } else if (this.props.user.accessCode === "Faculty") {
        rootRoute = <Route path='/' exact component={FacultyDashboard} />;
      } else if (
        this.props.user.accessCode === "Admin" ||
        this.props.user.accessCode === "SAdmin"
      ) {
        rootRoute = <Route path='/' exact component={SAdminDashboard} />;
      }
    }

    return (
      <>
        {!this.props.token ? (
          <>
            <Loader />
            <Switch>
              {/* <Route
                path='/404'
                render={() => (
                  <ErrorPage
                    code='404'
                    message='The page you requested was not found!'
                  />
                )}
              /> */}
              <Route path='/login' component={Login} />

              {/* <Redirect from='/' exact to='/login' />
              <Redirect to='/404' /> */}
              <Redirect to='/login' />
            </Switch>
          </>
        ) : (
          <>
            <Loader />
            <Header />

            {/* <!-- BEGIN MAIN CONTAINER  --> */}
            <div className='main-container' id='container'>
              <div className='overlay'></div>
              <div className='search-overlay'></div>

              <Sidebar />

              <Switch>
                {rootRoute}
                <Route path='/reset-password' component={ResetPassword} />
                <Route path='/change-password' component={ChangePassword} />
                <Route path='/profile' component={Profile} />
                <Route path='/branch' component={Branch} />
                <Route path='/degree' component={Degree} />
                <Route path='/noa' component={NOA} />
                <Route path='/category' component={Category} />
                <Route path='/semester' component={Semester} />
                <Route path='/activity' component={Activity} />
                <Route path='/activitydoc' component={ActivityDoc} />
                <Route path='/mapfaculty' component={ActivityFaculty} />
                <Route path='/pendingStudents' component={PendingStudents} />
                <Route path='/rejectedStudents' component={RejectedStudents} />
                <Route path='/approvedStudents' component={ApprovedStudents} />
                <Route
                  path='/facultyactivitydoc'
                  component={FacultyActivityDoc}
                />
                <Route
                  path='/studentactivityapply'
                  component={StudentActivityApply}
                />
                <Route
                  path='/studentactivitystatus'
                  component={StudentActivityStatus}
                />
                <Route
                  path='/studentactivityapproved'
                  component={StudentActivityApproved}
                />
                <Route path='/create-student' component={CreateStudent} />
                <Route path='/fetch-students' component={FetchStudent} />
                <Route path='/next-semester' component={NextSemester} />
                <Route path='/create-faculty' component={CreateFaculty} />
                <Route path='/fetch-faculties' component={FetchFaculty} />
                <Route path='/report-bysemester' component={ReportBySemester} />
                <Route path='/logout' component={Logout} />

                <Redirect to='/' />
              </Switch>
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  authToken = state.auth.token;
  return {
    // token: true,
    token: state.auth.token,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userAutoLogin: () => dispatch(actions.userAutoLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
