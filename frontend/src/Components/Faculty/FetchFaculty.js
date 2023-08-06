import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import SingleDropdown from "../Dropdown/SingleDropdown";
import Datatable from "../Table/Datatable";
import Modal from "../Modal/Modal";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import flatpickr from "flatpickr";
import FacultyView from "./FacultyView";
import Feather from "../Icons/Feather";
import { checkValidity } from "../../shared/utility";
import Notification from "../Notification/Notification";
import Swal from "sweetalert2";
import classes from "./Faculty.css";
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

class FetchFaculty extends Component {
  // state = {
  //   branchID: "",
  //   buttonClicked: false,
  //   firstName: "",
  //   middleName: "",
  //   lastName: "",
  //   password: "",
  //   email: "",
  //   mobileNo: "",
  //   erpId: "",
  //   branchId: "",
  //   DOB: "",
  //   verified: true,
  //   updateFacultyId: "",
  //   viewFacultyId: "",
  // };

  state = {
    branchID: "",
    buttonClicked: false,
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
      // password: {
      //   elementType: "input",
      //   elementConfig: {
      //     label: "Last name",
      //     type: "text",
      //     className: "form-control",
      //     id: "lastName",
      //     placeholder: "Last Name...",
      //     required: "",
      //     validFeedback: "",
      //     invalidFeedback: "",
      //   },
      //   value: "",
      //   validation: {
      //     required: true,
      //   },
      //   valid: false,
      //   touched: false,
      // },
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
        value: "true",
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
    formValidated: false,
    updateFacultyId: "",
    viewFacultyId: "",
  };

  componentDidMount() {
    this.props.getData({ type: "GET_BRANCH" });

    // $("#updateFacultyModal").modal("show");

    // window.addEventListener(
    //   "load",
    //   function () {
    //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //     var forms = document.getElementsByClassName("needs-validation");
    //     // Loop over them and prevent submission
    //     var validation = Array.prototype.filter.call(forms, function (form) {
    //       form.addEventListener(
    //         "submit",
    //         function (event) {
    //           if (form.checkValidity() === false) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //           }
    //           form.classList.add("was-validated");
    //         },
    //         false
    //       );
    //     });
    //   },
    //   false
    // );
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

  fetchFaculties = () => {
    console.log("inside called");

    if (this.state.branchID == "") {
      Notification("Please select branch.", "danger");
      return;
    }
    if (this.state.branchID !== "") {
      console.log("inside called condition");
      this.props.getFaculty({ branchId: this.state.branchID });
      this.setState({ buttonClicked: true });
    }
  };

  deleteFaculty = (facultyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Faculty has been deleted.", "success");
        this.props.deleteFaculty({
          facultyId,
          get: { branchId: this.state.branchID },
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

    this.props.updateFaculty({
      facultyId: newState.updateFacultyId,
      update: update,
      get: {
        branchId: newState.branchID,
      },
    });

    $("#updateFacultyModal").modal("hide");
  };

  launchEdit = (faculty) => {
    console.log(faculty);
    const newState = _.cloneDeep(this.state);

    for (let key in newState.formElements) {
      newState.formElements[key].value = faculty[key];
      let element = document.getElementById(
        newState.formElements[key].elementConfig.id
      );
      if (element) {
        element.className = "form-control";
        element.parentElement.childNodes[2].style.display = "none";
        element.parentElement.childNodes[3].style.display = "none";
      }
    }
    newState.updateFacultyId = faculty.id;

    this.setState(newState, () => {
      $("#updateFacultyModal").modal("show");
    });
  };

  viewStudent = (facultyId) => {
    this.setState({ viewFacultyId: facultyId });
    console.log(facultyId);
    this.props.getSingleFaculty(facultyId);
    $("#facultyDetail").modal("show");
  };

  render() {
    let table = null;
    let tableBody = null;
    const header = ["#", "Full Name", "DOB", "Contact", "ERP ID", "Action"];

    if (
      this.state.branchID !== "" &&
      this.props.faculties &&
      this.props.faculties.length !== 0 &&
      this.state.buttonClicked
    ) {
      tableBody = this.props.faculties.map((faculty, index) => (
        <tr key={faculty.id}>
          <td className='text-center'>{index + 1}</td>
          <td className='text-center'>
            {faculty.firstName +
              " " +
              faculty.middleName +
              " " +
              faculty.lastName}
          </td>

          <td className='text-center'>{faculty.DOB}</td>
          <td className='text-center'>{faculty.mobileNo}</td>
          <td className='text-center'>{faculty.erpId}</td>
          <td className='text-center'>
            <ul className='table-controls'>
              <li>
                <span
                  style={{ cursor: "pointer" }}
                  data-toggle='tooltip'
                  onClick={() => this.viewStudent(faculty.id)}
                  data-placement='top'
                  title='View'>
                  <div>
                    <Feather name='eye' className='text-primary' />
                  </div>
                </span>
              </li>
              <li>
                <span
                  onClick={() => this.launchEdit(faculty)}
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
                  onClick={() => this.deleteFaculty(faculty.id)}
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
        <Datatable id='fetch-faculty' header={header}>
          {tableBody}
        </Datatable>
      );
    } else {
      if (
        this.state.branchID !== "" &&
        this.props.faculties &&
        this.props.faculties.length === 0 &&
        this.state.buttonClicked
      ) {
        table = (
          <div className='row justify-content-center'>
            <h5>No faculties found!</h5>
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
                          <button
                            onClick={this.fetchFaculties}
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
                  id='updateFacultyModal'
                  isUpdate={true}
                  class='modal-lg'
                  updateName={["Update Faculty", ""]}
                  submit={this.onFormSubmit}>
                  <h5 className=''>Update Faculty</h5>
                  <form
                    id='updateFacultyForm'
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
                      {/* <div className='col-md-4 mb-4'>
                        <MyInput
                          label='First Name'
                          type='text'
                          className='form-control'
                          id='firstName'
                          placeholder='First name...'
                          value={this.state.firstName}
                          required
                          change={(event) =>
                            this.inputHandler(event, "firstName")
                          }
                          validFeedback='Valid'
                          invalidFeedback='Invalid'
                        />
                      </div>
                      <div className='col-md-4 mb-4'>
                        <MyInput
                          label='Middle Name'
                          type='text'
                          className='form-control'
                          id='middleName'
                          placeholder='Middle name...'
                          value={this.state.middleName}
                          required
                          change={(event) =>
                            this.inputHandler(event, "middleName")
                          }
                          validFeedback=''
                          invalidFeedback=''
                        />
                      </div>
                      <div className='col-md-4 mb-4'>
                        <MyInput
                          label='Last name'
                          type='text'
                          className='form-control'
                          id='lastName'
                          placeholder='Last Name...'
                          value={this.state.lastName}
                          required
                          change={(event) =>
                            this.inputHandler(event, "lastName")
                          }
                          validFeedback=''
                          invalidFeedback=''
                        />
                      </div> */}
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
                      {/* <div className='col-md-4 mb-4'>
                        <MyInput
                          label='Email'
                          type='text'
                          className='form-control'
                          id='email'
                          placeholder='Your email...'
                          value={this.state.email}
                          required
                          change={(event) => this.inputHandler(event, "email")}
                          validFeedback=''
                          invalidFeedback=''
                        />
                      </div>
                      <div className='col-md-4 mb-4'>
                        <MyInput
                          label='Mobile No.'
                          type='text'
                          className='form-control'
                          id='mobileNo'
                          placeholder='Mobile number...'
                          value={this.state.mobileNo}
                          required
                          change={(event) =>
                            this.inputHandler(event, "mobileNo")
                          }
                          validFeedback=''
                          invalidFeedback=''
                        />
                      </div>
                      <div className='col-md-4 mb-4'>
                        <MyInput
                          label='DOB'
                          type='text'
                          className='form-control flatpickr flatpickr-input active'
                          id='dob'
                          placeholder='Date of birth...'
                          value={this.state.DOB}
                          required
                          change={(event) => this.inputHandler(event, "DOB")}
                          validFeedback=''
                          invalidFeedback=''
                        />
                      </div> */}
                    </div>
                    <div className='form-row'>
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
                        {/* <MySelect
                          label='Branch'
                          type='text'
                          className='form-control'
                          id='branch'
                          placeholder='Branch...'
                          value={this.state.branchId}
                          required
                          change={(event) =>
                            this.inputHandler(event, "branchId")
                          }
                          validFeedback=''
                          invalidFeedback=''>
                          <option value=''>Select...</option>
                          {this.props.branches.map((branch) => (
                            <option value={branch.id} key={branch.id}>
                              {branch.branchName}
                            </option>
                          ))}
                        </MySelect> */}
                      </div>

                      <div className='col-md-4 mb-4'>
                        <MyInput
                          {...this.state.formElements["erpId"].elementConfig}
                          value={this.state.formElements["erpId"].value}
                          change={(event) => this.inputHandler(event, "erpId")}
                        />
                        {/* <MyInput
                          label='ERP ID'
                          type='text'
                          className='form-control'
                          id='erpid'
                          placeholder='Your ERP ID...'
                          value={this.state.erpId}
                          required
                          change={(event) => this.inputHandler(event, "erpId")}
                          validFeedback=''
                          invalidFeedback=''
                        /> */}
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
                <FacultyView faculty={this.props.faculty} />
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
    faculties: state.faculty.faculties,
    faculty: state.faculty.faculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(actions.getData(data)),
    getFaculty: (data) => dispatch(actions.getFaculty(data)),
    deleteFaculty: (data) => dispatch(actions.deleteFaculty(data)),
    getSingleFaculty: (studentId) =>
      dispatch(actions.getSingleFaculty(studentId)),
    updateFaculty: (data) => dispatch(actions.updateFaculty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchFaculty);
