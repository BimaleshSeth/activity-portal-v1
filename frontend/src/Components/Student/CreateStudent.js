import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/";

import $ from "jquery";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "datatables.net-bs4";
import flatpickr from "flatpickr";
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

class CreateStudent extends Component {
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
      password: {
        elementType: "input",
        elementConfig: {
          label: "New Password",
          type: "text",
          className: "form-control",
          id: "password",
          placeholder: "New password...",
          required: "true",
          validFeedback: "looks good.",
          invalidFeedback: "invalid password.",
        },
        value: "",
        validation: {
          required: true,
          isPass: true,
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
    },
  };

  componentDidMount() {
    this.props.getBranch({ type: "GET_BRANCH" });
    this.props.getDegree({ type: "GET_DEGREE" });
    this.props.getSemester({ type: "GET_SEMESTER" });

    flatpickr(document.getElementById("dob"), {
      dateFormat: "d/m/Y",
    });
  }

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

  onFormSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);
    let newState = _.cloneDeep(this.state);
    let data = {};
    let valid = true;

    for (let key in newState.formElements) {
      data[key] = newState.formElements[key].value;
      newState.formElements[key].value = "";
      let element = document.getElementById(
        newState.formElements[key].elementConfig.id
      );
      let validity = checkValidity(
        data[key],
        newState.formElements[key].validation
      );
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
      valid = valid && validity;
    }

    if (!valid) {
      Notification("Something went wrong. Please check form data.", "danger");
      // console.log(this.state);
      return;
    }
    // console.log(this.state);
    this.props.createStudent(data);
    this.setState(newState);
    for (let key in newState.formElements) {
      let element = document.getElementById(
        newState.formElements[key].elementConfig.id
      );
      element.className = "form-control ";
      element.parentElement.childNodes[2].style.display = "none";
      element.parentElement.childNodes[3].style.display = "none";
    }
  };

  render() {
    return (
      <>
        {/*  <!--  BEGIN CONTENT AREA  --> */}
        <div id='content' className='main-content'>
          <div className='layout-px-spacing'>
            <div className='row layout-top-spacing'>
              <div className='col-xl-12 col-lg-12 col-sm-12  layout-spacing'>
                <div className='statbox widget box box-shadow'>
                  <div className='widget-header'>
                    <div className='row text-center'>
                      <div className='col-xl-12 col-md-12 col-sm-12 col-12 '>
                        <h3>Create Student</h3>
                      </div>
                    </div>
                  </div>
                  <div className='widget-content widget-content-area br-6'>
                    <form
                      className='needs-validation'
                      onSubmit={this.onFormSubmit}>
                      <div className='form-row'>
                        {["firstName", "middleName", "lastName"].map(
                          (item, index) => (
                            <div className='col-md-4 mb-4' key={index}>
                              <MyInput
                                {...this.state.formElements[item].elementConfig}
                                value={this.state.formElements[item].value}
                                change={(event) =>
                                  this.inputHandler(event, item)
                                }
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
                            {...this.state.formElements["degreeId"]
                              .elementConfig}
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
                            {...this.state.formElements["branchId"]
                              .elementConfig}
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
                            {...this.state.formElements["password"]
                              .elementConfig}
                            value={this.state.formElements["password"].value}
                            change={(event) =>
                              this.inputHandler(event, "password")
                            }
                          />
                        </div>
                      </div>

                      <div className='form-row'>
                        {[
                          { name: "erpId", class: "col-md-4 mb-4" },
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
                      </div>
                      <div className='form-row justify-content-center'>
                        <button className='btn btn-primary mt-3' type='submit'>
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
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
    branches: state.CRUD.branches,
    degrees: state.CRUD.degrees,
    semesters: state.CRUD.semesters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranch: (data) => dispatch(actions.getData(data)),
    getDegree: (data) => dispatch(actions.getData(data)),
    getSemester: (data) => dispatch(actions.getData(data)),
    createStudent: (body) => dispatch(actions.createStudent(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
