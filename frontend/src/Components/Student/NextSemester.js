import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import SingleDropdown from "../Dropdown/SingleDropdown";
import Datatable from "../Table/Datatable";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import flatpickr from "flatpickr";
import StudentView from "./StudentView";
import Feather from "../Icons/Feather";
import Notification from "../Notification/Notification";

class NextSemester extends Component {
  state = {
    branchID: "",
    semesterID: "",
    buttonClicked: false,
    viewStudentId: "",
    studentIds: [],
  };

  componentDidMount() {
    this.props.getData({ type: "GET_BRANCH" });
    this.props.getData({ type: "GET_SEMESTER" });
    this.props.getData({ type: "GET_DEGREE" });
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  checkHandler = (event, studentId) => {
    const newState = { ...this.state };
    console.log(event.target.checked);
    if (event.target.checked) {
      newState.studentIds.push(studentId);
    } else {
      newState.studentIds = newState.studentIds.filter(
        (id) => id !== studentId
      );
    }
    console.log(newState.studentIds);
    this.setState(newState);
  };

  fetchStudents = () => {
    console.log("inside called");

    if (this.state.branchID == "") {
      Notification("Please select branch.", "danger");
      return;
    }
    if (this.state.semesterID == "") {
      Notification("Please select semester.", "danger");
      return;
    }
    if (this.state.branchID !== "" && this.state.semesterID !== "") {
      console.log("inside called condition");
      this.props.getStudent({
        semesterId: this.state.semesterID,
        branchId: this.state.branchID,
      });
      this.setState({ buttonClicked: true });
    }
  };

  viewStudent = (studentId) => {
    this.setState({ viewStudentId: studentId });
    console.log(studentId);
    this.props.getSingleStudent(studentId);
    $("#studentViewModal").modal("show");
  };

  nextSemester = () => {
    this.props.nextSemester({
      semesterId: this.state.semesterID,
      branchId: this.state.branchID,
      studentIds: this.state.studentIds,
    });
  };

  render() {
    let table = null;
    let tableBody = null;
    const header = [
      "Select",
      "Full Name",
      "DOB",
      "Contact",
      "Roll No.",
      "Division",
      "ERP ID",
      "Action",
    ];

    if (
      this.state.activityId !== "" &&
      this.state.branchID !== "" &&
      this.props.students &&
      this.props.students.length !== 0 &&
      this.state.buttonClicked
    ) {
      tableBody = this.props.students.map((student) => (
        <tr key={student.id}>
          <td className='text-center'>
            <div className='n-chk'>
              <label className='new-control new-checkbox new-checkbox-rounded new-checkbox-text checkbox-outline-danger'>
                <input
                  type='checkbox'
                  className='new-control-input'
                  onChange={(e) => this.checkHandler(e, student.id)}
                />
                <span className='new-control-indicator'></span>
              </label>
            </div>
          </td>
          <td className='text-center'>
            {student.firstName +
              " " +
              student.middleName +
              " " +
              student.lastName}
          </td>

          <td className='text-center'>{student.DOB}</td>
          <td className='text-center'>{student.mobileNo}</td>
          <td className='text-center'>{student.rollNo}</td>
          <td className='text-center'>{student.division}</td>
          <td className='text-center'>{student.erpId}</td>
          <td className='text-center'>
            <ul className='table-controls'>
              <li>
                <span
                  style={{ cursor: "pointer" }}
                  data-toggle='tooltip'
                  onClick={() => this.viewStudent(student.id)}
                  data-placement='top'
                  title='View'>
                  <div>
                    <Feather name='eye' className='text-primary' />
                  </div>
                </span>
              </li>
            </ul>
          </td>
        </tr>
      ));

      table = (
        <>
          <div style={{ fontSize: "16px", color: "red" }}>
            * Please select students only if you don't want them to pass to next
            semester.
          </div>
          <Datatable id='fetch-student' header={header}>
            {tableBody}
          </Datatable>
          <div className='row mt-4 mb-4 justify-content-center'>
            <button onClick={this.nextSemester} className='btn btn-success'>
              Pass to Next Semester
            </button>
          </div>
        </>
      );
    } else {
      if (
        this.state.activityId !== "" &&
        this.state.branchID !== "" &&
        this.props.students &&
        this.props.students.length === 0 &&
        this.state.buttonClicked
      ) {
        table = (
          <div className='row justify-content-center'>
            <h5>No students found!</h5>
          </div>
        );
      }
    }

    let branch = (
      <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 text-center'>
        <div className='form-group row mb-4'>
          {this.props.branches && this.props.branches.length !== 0 ? (
            <>
              <label
                htmlFor='colFormLabelLg'
                className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                Branch
              </label>
              <div className='col-sm-10'>
                <SingleDropdown
                  placeholder='Select Branch...'
                  id='student-branch'
                  change={(e) => this.inputHandler(e, "branchID")}
                  value={this.state.branchID}>
                  {this.props.branches.map((a) => (
                    <option value={a.id} key={a.id}>
                      {a.branchName}
                    </option>
                  ))}
                </SingleDropdown>
              </div>
            </>
          ) : (
            <label className='col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
              Branch not found!
            </label>
          )}
        </div>
      </div>
    );

    let semester = (
      <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 text-center'>
        <div className='form-group row mb-4'>
          {this.props.semesters && this.props.semesters.length !== 0 ? (
            <>
              <label
                htmlFor='colFormLabelLg'
                className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                Semester
              </label>
              <div className='col-sm-10'>
                <SingleDropdown
                  placeholder='Select Semester...'
                  id='student-semester'
                  change={(e) => this.inputHandler(e, "semesterID")}
                  value={this.state.semesterID}>
                  {this.props.semesters.map((semester) => (
                    <option value={semester.id} key={semester.id}>
                      {"Semester - " + semester.semester}
                    </option>
                  ))}
                </SingleDropdown>
              </div>
            </>
          ) : (
            <label className='col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
              Semesters not found!
            </label>
          )}
        </div>
      </div>
    );

    return (
      <>
        {/*  <!--  BEGIN CONTENT AREA  --> */}
        <div id='content' className='main-content'>
          <div className='layout-px-spacing'>
            <div className='row layout-top-spacing'>
              <div className='col-xl-12 col-lg-12 col-sm-12  layout-spacing'>
                <div className='statbox widget box box-shadow'>
                  <div className='widget-header'>
                    <div className='row '>
                      <div className='col-xl-12 col-md-12 col-sm-12 col-12 text-center'>
                        <h3>Next Semester</h3>

                        <div
                          className='row justify-content-center'
                          style={{ marginTop: "50px" }}>
                          {branch}
                        </div>
                        <div className='row justify-content-center'>
                          {semester}
                        </div>
                        <div className='row justify-content-center'>
                          <button
                            onClick={this.fetchStudents}
                            className='btn btn-primary'>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='widget-content widget-content-area br-6'>
                    {table}
                  </div>
                </div>
                <StudentView student={this.props.student} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    semesters: state.CRUD.semesters,
    branches: state.CRUD.branches,
    degrees: state.CRUD.degrees,
    students: state.student.students,
    student: state.student.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(actions.getData(data)),
    getStudent: (data) => dispatch(actions.getStudent(data)),
    // deleteStudent: (data) => dispatch(actions.deleteStudent(data)),
    getSingleStudent: (studentId) =>
      dispatch(actions.getSingleStudent(studentId)),
    nextSemester: (data) => dispatch(actions.nextSemester(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextSemester);
