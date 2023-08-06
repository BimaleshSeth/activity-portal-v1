import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import SingleDropdown from "../Dropdown/SingleDropdown";
import Datatable from "../Table/Datatable";
import Modal from "../Modal/Modal";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import flatpickr from "flatpickr";
import StudentView from "./StudentView";
import Feather from "../Icons/Feather";
import { checkValidity } from "../../shared/utility";
import Notification from "../Notification/Notification";
import Swal from "sweetalert2";
import classes from "./Student.css";
import _ from "lodash";

const MyInput = ({
  label,
  validFeedback,
  invalidFeedback,
  change,
  ...otherProps
}) => (
  <>
    <label htmlFor={otherProps.id}>{label}</label>
    {label === "DOB" ? (
      <input {...otherProps} onInput={change} />
    ) : (
      <input {...otherProps} onChange={change} />
    )}
    <div className='valid-feedback'>{validFeedback}</div>
    <div className='invalid-feedback'>{invalidFeedback}</div>
  </>
);

const MySelect = ({
  label,
  validFeedback,
  invalidFeedback,
  children,
  change,
  ...otherProps
}) => (
  <>
    <label htmlFor={otherProps.id}>{label}</label>
    <select {...otherProps} onChange={change}>
      {children}
    </select>
    <div className='valid-feedback'>{validFeedback}</div>
    <div className='invalid-feedback'>{invalidFeedback}</div>
  </>
);

class FetchStudent extends Component {
  state = {
    formElements: {
      firstName: {
        elementType: "input",
        elementConfig: {
          label: "First Name",
          type: "text",
          className: "form-control",
          id: "firstName",
          placeholder: "First name...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid first name.",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      middleName: {
        elementType: "input",
        elementConfig: {
          label: "Middle Name",
          type: "text",
          className: "form-control",
          id: "middleName",
          placeholder: "Middle name...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid middle name.",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          label: "Last name",
          type: "text",
          className: "form-control",
          id: "lastName",
          placeholder: "Last Name...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid last name.",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      email: {
        elementType: "input",
        elementConfig: {
          label: "Email",
          type: "text",
          className: "form-control",
          id: "email",
          placeholder: "Your email...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid email.",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      mobileNo: {
        elementType: "input",
        elementConfig: {
          label: "Mobile No.",
          type: "text",
          className: "form-control",
          id: "mobileNo",
          placeholder: "Mobile number...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid mobile number.",
        },
        value: "",
        validation: {
          required: true,
          isMobile: true,
        },
        valid: false,
        touched: false,
      },
      studentType: {
        elementType: "input",
        elementConfig: {
          label: "Student Type",
          type: "text",
          className: "form-control",
          id: "studentType",
          placeholder: "Student Type...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "please select student type.",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      erpId: {
        elementType: "input",
        elementConfig: {
          label: "ERP ID",
          type: "text",
          className: "form-control",
          id: "erpid",
          placeholder: "Your ERP ID...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid erp id.",
        },
        value: "",
        validation: {
          required: true,
          // isErpId:true
        },
        valid: false,
        touched: false,
      },
      degreeId: {
        elementType: "select",
        elementConfig: {
          label: "Degree",
          className: "form-control",
          id: "degree",
          placeholder: "Degree...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "please select a degree.",
        },
        value: "",
        validation: {
          required: true,
          isId: true,
        },
        valid: false,
        touched: false,
      },
      branchId: {
        elementType: "select",
        elementConfig: {
          label: "Branch",
          className: "form-control",
          id: "branch",
          placeholder: "Branch...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "please select a branch.",
        },
        value: "",
        validation: {
          required: true,
          isId: true,
        },
        valid: false,
        touched: false,
      },
      semesterId: {
        elementType: "select",
        elementConfig: {
          label: "Semester",
          className: "form-control",
          id: "semester",
          placeholder: "Semester...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "please select a semester.",
        },
        value: "",
        validation: {
          required: true,
          isId: true,
        },
        valid: false,
        touched: false,
      },
      DOB: {
        elementType: "input",
        elementConfig: {
          label: "DOB",
          type: "text",
          className: "form-control flatpickr flatpickr-input active",
          id: "dob",
          placeholder: "Date of birth...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "please select a date.",
        },
        value: "",
        validation: {
          required: true,
          isDOB: true,
        },
        valid: false,
        touched: false,
      },
      rollNo: {
        elementType: "input",
        elementConfig: {
          label: "Roll No.",
          type: "text",
          className: "form-control",
          id: "rollno",
          placeholder: "Roll no...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid roll no.",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      division: {
        elementType: "input",
        elementConfig: {
          label: "Division",
          type: "text",
          className: "form-control",
          id: "division",
          placeholder: "Division...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid division.",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      verified: {
        elementType: "check",
        elementConfig: {},
        value: true,
        validation: {
          required: true,
          isBoolean: true,
        },
        valid: true,
        touched: true,
      },
    },
    updateStudentId: "",
    viewStudentId: "",
    branchID: "",
    semesterID: "",
    buttonClicked: false,
  };

  componentDidMount() {
    this.props.getData({ type: "GET_BRANCH" });
    this.props.getData({ type: "GET_SEMESTER" });
    this.props.getData({ type: "GET_DEGREE" });

    flatpickr(document.getElementById("dob"), {
      dateFormat: "d/m/Y",
    });
  }

  changeHandler = (event, identifier) => {
    const newState = _.cloneDeep(this.state);
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  inputHandler = (event, identifier) => {
    const newState = _.cloneDeep(this.state);
    console.log(newState);
    newState.formElements[identifier].value = event.target.value;
    newState.formElements[identifier].touched = true;

    if (newState.formElements[identifier].touched) {
      let element = document.getElementById(event.target.id);

      if (
        !checkValidity(
          event.target.value,
          newState.formElements[identifier].validation
        )
      ) {
        element.className = "form-control " + classes.invalidForm;
        element.parentElement.childNodes[2].style.display = "none";
        element.parentElement.childNodes[3].style.display = "block";
      } else {
        element.className = "form-control " + classes.validForm;
        element.parentElement.childNodes[2].style.display = "block";
        element.parentElement.childNodes[3].style.display = "none";
        newState.formElements[identifier].valid = true;
      }
    }
    this.setState(newState);
  };

  checkHandler = (event, identifier) => {
    const newState = _.cloneDeep(this.state);
    newState.formElements[identifier].value = event.target.checked;
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

  deleteStudent = (studentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Student has been deleted.", "success");
        this.props.deleteStudent({
          studentId,
          get: {
            semesterId: this.state.semesterID,
            branchId: this.state.branchID,
          },
        });
      }
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    let update = {};
    let valid = true;
    const newState = _.cloneDeep(this.state);

    for (let key in newState.formElements) {
      update[key] = newState.formElements[key].value;
      if (newState.formElements[key].elementType == "check") {
        newState.formElements[key].value = true;
      } else {
        newState.formElements[key].value = "";
      }
      let element = document.getElementById(
        newState.formElements[key].elementConfig.id
      );
      let validity = checkValidity(
        update[key],
        newState.formElements[key].validation
      );
      if (element) {
        if (!validity) {
          element.className = "form-control " + classes.invalidForm;
          element.parentElement.childNodes[2].style.display = "none";
          element.parentElement.childNodes[3].style.display = "block";
        } else {
          element.className = "form-control " + classes.validForm;
          element.parentElement.childNodes[2].style.display = "block";
          element.parentElement.childNodes[3].style.display = "none";
          // newState.formElements[key].valid = true;
        }
      }
      valid = valid && validity;
    }

    if (!valid) {
      Notification("Something went wrong. Please check form data.", "danger");
      console.log(this.state);
      return;
    }

    this.props.updateStudent({
      studentId: this.state.updateStudentId,
      update: update,
      get: {
        semesterId: this.state.semesterID,
        branchId: this.state.branchID,
      },
    });

    $("#updateStudentModal").modal("hide");
  };

  launchEdit = (student) => {
    console.log(student);
    const newState = _.cloneDeep(this.state);

    for (let key in newState.formElements) {
      newState.formElements[key].value = student[key];
      let element = document.getElementById(
        newState.formElements[key].elementConfig.id
      );
      if (element) {
        element.className = "form-control";
        element.parentElement.childNodes[2].style.display = "none";
        element.parentElement.childNodes[3].style.display = "none";
      }
    }
    newState.updateStudentId = student.id;

    this.setState(newState, () => {
      $("#updateStudentModal").modal("show");
    });
  };

  viewStudent = (studentId) => {
    this.setState({ viewStudentId: studentId });
    console.log(studentId);
    this.props.getSingleStudent(studentId);
    $("#studentViewModal").modal("show");
  };

  render() {
    let table = null;
    let tableBody = null;
    const header = [
      "Full Name",
      "DOB",
      "Contact",
      "Roll No.",
      "Division",
      "ERP ID",
      "Action",
    ];

    if (
      this.state.semesterID !== "" &&
      this.state.branchID !== "" &&
      this.props.students &&
      this.props.students.length !== 0 &&
      this.state.buttonClicked
    ) {
      tableBody = this.props.students.map((student) => (
        <tr key={student.id}>
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
              <li>
                <span
                  onClick={() => this.launchEdit(student)}
                  style={{ cursor: "pointer" }}
                  data-toggle='tooltip'
                  data-placement='top'
                  title='Edit'>
                  <div>
                    <Feather name='edit-2' className='text-success' />
                  </div>
                </span>
              </li>
              <li>
                <span
                  onClick={() => this.deleteStudent(student.id)}
                  style={{ cursor: "pointer" }}
                  data-toggle='tooltip'
                  data-placement='top'
                  title='Delete'>
                  <div>
                    <Feather name='trash-2' className='text-danger' />
                  </div>
                </span>
              </li>
            </ul>
          </td>
        </tr>
      ));

      table = (
        <Datatable id='fetch-student' header={header}>
          {tableBody}
        </Datatable>
      );
    } else {
      if (
        this.state.semesterID !== "" &&
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
                  change={(e) => this.changeHandler(e, "branchID")}
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
                  change={(e) => this.changeHandler(e, "semesterID")}
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
                        <h3>Fetch Students</h3>

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
                {/* <!-- Modal --> */}
                <Modal
                  class='modal-xl'
                  id='updateStudentModal'
                  isUpdate={true}
                  updateName={["Update Student", ""]}
                  submit={this.onFormSubmit}>
                  <h5 className=''>Update Student</h5>
                  <form
                    id='updateStudentForm'
                    className='needs-validation'
                    // onSubmit={this.onFormSubmit}
                  >
                    <div className='form-row'>
                      {["firstName", "middleName", "lastName"].map(
                        (item, index) => (
                          <div className='col-md-4 mb-4' key={index}>
                            <MyInput
                              {...this.state.formElements[item].elementConfig}
                              value={this.state.formElements[item].value}
                              change={(event) => this.inputHandler(event, item)}
                            />
                          </div>
                        )
                      )}
                    </div>
                    <div className='form-row'>
                      {["email", "mobileNo", "DOB"].map((item, index) => (
                        <div className='col-md-4 mb-4' key={index}>
                          <MyInput
                            {...this.state.formElements[item].elementConfig}
                            value={this.state.formElements[item].value}
                            change={(event) => this.inputHandler(event, item)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className='form-row'>
                      <div className='col-md-2 mb-4'>
                        <MySelect
                          {...this.state.formElements["degreeId"].elementConfig}
                          value={this.state.formElements["degreeId"].value}
                          change={(event) =>
                            this.inputHandler(event, "degreeId")
                          }>
                          <option value=''>Select...</option>
                          {this.props.degrees.map((degree) => (
                            <option value={degree.id} key={degree.id}>
                              {degree.degreeName}
                            </option>
                          ))}
                        </MySelect>
                      </div>

                      <div className='col-md-2 mb-4'>
                        <MySelect
                          {...this.state.formElements["semesterId"]
                            .elementConfig}
                          value={this.state.formElements["semesterId"].value}
                          change={(event) =>
                            this.inputHandler(event, "semesterId")
                          }>
                          <option value=''>Select...</option>
                          {this.props.semesters.map((semester) => (
                            <option value={semester.id} key={semester.id}>
                              {semester.semester}
                            </option>
                          ))}
                        </MySelect>
                      </div>

                      <div className='col-md-4 mb-4'>
                        <MySelect
                          {...this.state.formElements["branchId"].elementConfig}
                          value={this.state.formElements["branchId"].value}
                          change={(event) =>
                            this.inputHandler(event, "branchId")
                          }>
                          <option value=''>Select...</option>
                          {this.props.branches.map((branch) => (
                            <option value={branch.id} key={branch.id}>
                              {branch.branchName}
                            </option>
                          ))}
                        </MySelect>
                      </div>
                      <div className='col-md-4 mb-4'>
                        <MyInput
                          {...this.state.formElements["erpId"].elementConfig}
                          value={this.state.formElements["erpId"].value}
                          change={(event) => this.inputHandler(event, "erpId")}
                        />
                      </div>
                    </div>

                    <div className='form-row'>
                      {[
                        { name: "rollNo", class: "col-md-2 mb-4" },
                        { name: "division", class: "col-md-3 mb-4" },
                      ].map((item, index) => (
                        <div className={item.class} key={index}>
                          <MyInput
                            {...this.state.formElements[item.name]
                              .elementConfig}
                            value={this.state.formElements[item.name].value}
                            change={(event) =>
                              this.inputHandler(event, item.name)
                            }
                          />
                        </div>
                      ))}

                      <div className='col-md-3 mb-4'>
                        <MySelect
                          {...this.state.formElements["studentType"]
                            .elementConfig}
                          value={this.state.formElements["studentType"].value}
                          change={(event) =>
                            this.inputHandler(event, "studentType")
                          }>
                          <option value=''>Select...</option>
                          <option value='Regular'>Regular</option>
                          <option value='DSE'>Direct Second Year</option>
                        </MySelect>
                      </div>

                      <div
                        className='col-md-4 mb-4'
                        style={{ paddingTop: "40px" }}>
                        <div className='form-row'>
                          <div className='form-group col-md-4 text-right'>
                            <div className='form-check pl-0'>
                              <label
                                className='switch s-icons s-outline  s-outline-primary  mb-4 mr-2'
                                style={{ marginRight: 0 }}>
                                <input
                                  type='checkbox'
                                  checked={
                                    this.state.formElements["verified"].value
                                  }
                                  onChange={(e) =>
                                    this.checkHandler(e, "verified")
                                  }
                                />
                                <span className='slider round'></span>
                              </label>
                            </div>
                          </div>
                          <div className='form-group col-md-8'>
                            <label
                              className='font-weight-bold'
                              style={{
                                fontSize: "16px",
                                // marginLeft: "-20px",
                              }}>
                              {this.state.formElements["verified"].value
                                ? "Verified"
                                : "Unverified"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Modal>

                {/* <!-- Modal --> */}
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
    deleteStudent: (data) => dispatch(actions.deleteStudent(data)),
    getSingleStudent: (studentId) =>
      dispatch(actions.getSingleStudent(studentId)),
    updateStudent: (data) => dispatch(actions.updateStudent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchStudent);
