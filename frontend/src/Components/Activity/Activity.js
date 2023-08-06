import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import ActivityTable from './ActivityTable';
import ActivityView from './ActivityView';
import ActivityDisplay from './ActivityDisplay';
import Feather from '../Icons/Feather';
import { checkValidity } from '../../shared/utility';
import Notification from '../Notification/Notification';
import classes from './Activity.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import "datatables.net-bs4";
import flatpickr from 'flatpickr';
import Swal from 'sweetalert2';
import _ from 'lodash';
import SingleDropdown from '../Dropdown/SingleDropdown';

class Activity extends Component {
  state = {
    updateId: null,
    isUpdate: false,
    formElements: {
      title: {
        elementType: 'input',
        elementConfig: {
          label: 'Title',
          id: 'title',
          placeholder: 'Enter activity name...',
          type: 'text',
          className: 'form-control',
          // required: '',
          validFeedback: 'looks good.',
          invalidFeedback: 'please enter a valid title.',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      studentHead: {
        elementType: 'input',
        elementConfig: {
          label: 'Student Head',
          id: 'studentHead',
          placeholder: 'Enter student head name...',
          type: 'text',
          className: 'form-control',
          // required: '',
          validFeedback: "it's optional.",
          invalidFeedback: 'please enter a valid name.',
        },
        value: '',
        validation: {},
        valid: false,
        touched: false,
      },
      sDate: {
        elementType: 'input',
        elementConfig: {
          label: 'Start Date',
          id: 'activityStartDate',
          placeholder: 'Select Start Date..',
          type: 'text',
          className: 'form-control flatpickr flatpickr-input active',
          // required: '',
          validFeedback: 'looks good.',
          invalidFeedback: 'please select a start date.',
        },
        value: '',
        validation: {
          required: true,
          isDate: true,
        },
        valid: false,
        touched: false,
      },
      eDate: {
        elementType: 'input',
        elementConfig: {
          label: 'End Date',
          id: 'activityEndDate',
          placeholder: 'Select End Date..',
          type: 'text',
          className: 'form-control flatpickr flatpickr-input active',
          // required: '',
          validFeedback: 'looks good.',
          invalidFeedback: 'please select a end date.',
        },
        value: '',
        validation: {
          required: true,
          isDate: true,
        },
        valid: false,
        touched: false,
      },
      hours: {
        elementType: 'input',
        elementConfig: {
          label: 'Hours',
          id: 'hours',
          placeholder: 'Hours',
          type: 'text',
          className: 'form-control',
          // required: '',
          validFeedback: 'looks good.',
          invalidFeedback: 'Invalid hours.',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      points: {
        elementType: 'input',
        elementConfig: {
          label: 'Points',
          id: 'points',
          placeholder: 'Points',
          type: 'text',
          className: 'form-control',
          // required: '',
          validFeedback: 'looks good.',
          invalidFeedback: 'Invalid points.',
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      categoryId: {
        elementType: 'select',
        elementConfig: {
          label: 'Category',
          className: 'form-control',
          id: 'category',
          placeholder: 'Select Category',
          // required: '',
          validFeedback: 'looks good.',
          invalidFeedback: 'please select a category.',
        },
        value: '',
        validation: {
          required: true,
          isId: true,
        },
        valid: false,
        touched: false,
      },
      noaId: {
        elementType: 'select',
        elementConfig: {
          label: 'Nature Of Activity',
          className: 'form-control',
          id: 'noa',
          placeholder: 'Select NOA',
          // required: '',
          validFeedback: 'looks good.',
          invalidFeedback: 'please select a NOA.',
        },
        value: '',
        validation: {
          required: true,
          isId: true,
        },
        valid: false,
        touched: false,
      },
      active: {
        elementType: 'check',
        elementConfig: {},
        value: true,
        validation: {
          required: true,
          isBoolean: true,
        },
        valid: true,
        touched: true,
      },
      docRequired: {
        elementType: 'check',
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
    categoryId: '',
  };

  componentDidMount() {
    // this.props.getData({ type: 'GET_ACTIVITY' });
    this.props.getData({ type: 'GET_BRANCH' });
    this.props.getData({ type: 'GET_CATEGORY' });
    this.props.getData({ type: 'GET_NOA' });

    flatpickr(document.getElementById('activityStartDate'), {
      dateFormat: 'd/m/Y',
    });
    flatpickr(document.getElementById('activityEndDate'), {
      dateFormat: 'd/m/Y',
    });
  }

  onCategoryChange = (e) => {
    if (e.target.value) {
      const newState = _.cloneDeep(this.state);
      console.log(newState);
      newState['categoryId'] = e.target.value;
      this.setState(newState);
      this.props.getActivity(e.target.value);
    }
  };

  inputHandler = (event, identifier) => {
    const newState = _.cloneDeep(this.state);
    console.log(newState);
    newState.formElements[identifier].value = event.target.value;
    newState.formElements[identifier].touched = true;
    console.log(newState);
    if (newState.formElements[identifier].touched) {
      let element = document.getElementById(event.target.id);

      if (
        !checkValidity(
          event.target.value,
          newState.formElements[identifier].validation
        )
      ) {
        element.className = 'form-control ' + classes.invalidForm;
        element.parentElement.childNodes[2].style.display = 'none';
        element.parentElement.childNodes[3].style.display = 'block';
      } else {
        element.className = 'form-control ' + classes.validForm;
        element.parentElement.childNodes[2].style.display = 'block';
        element.parentElement.childNodes[3].style.display = 'none';
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

  activityButton = (event) => {
    event.preventDefault();

    let update = {};
    let valid = true;
    const newState = _.cloneDeep(this.state);

    for (let key in newState.formElements) {
      update[key] = newState.formElements[key].value;
      if (newState.formElements[key].elementType == 'check') {
        newState.formElements[key].value = true;
      } else {
        newState.formElements[key].value = '';
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
          element.className = 'form-control ' + classes.invalidForm;
          element.parentElement.childNodes[2].style.display = 'none';
          element.parentElement.childNodes[3].style.display = 'block';
        } else {
          element.className = 'form-control ' + classes.validForm;
          element.parentElement.childNodes[2].style.display = 'block';
          element.parentElement.childNodes[3].style.display = 'none';
          // newState.formElements[key].valid = true;
        }
      }
      valid = valid && validity;
    }

    if (!valid) {
      Notification('Something went wrong. Please check form data.', 'danger');
      console.log(this.state);
      return;
    }

    if (newState.isUpdate) {
      this.props.updateActivity({
        type: 'UPDATE_ACTIVITY',
        body: update,
        id: newState.updateId,
      });
    } else {
      this.props.createActivity({
        type: 'CREATE_ACTIVITY',
        body: update,
      });
    }

    newState.updateId = null;
    newState.isUpdate = false;

    this.setState(newState, () => {
      $('#activityModal').modal('hide');
    });
  };

  launchUpdate = (activity) => {
    console.log(activity);
    const newState = _.cloneDeep(this.state);

    for (let key in newState.formElements) {
      newState.formElements[key].value = activity[key];
      let element = document.getElementById(
        newState.formElements[key].elementConfig.id
      );
      if (element) {
        element.className = 'form-control';
        element.parentElement.childNodes[2].style.display = 'none';
        element.parentElement.childNodes[3].style.display = 'none';
      }
    }
    newState.isUpdate = true;
    newState.updateId = activity.id;

    this.setState(newState, () => {
      $('#activityModal').modal('show');
    });
  };

  addButton = (event) => {
    event.preventDefault();
    const newState = _.cloneDeep(this.state);

    for (let key in newState.formElements) {
      if (newState.formElements[key].elementType == 'check') {
        newState.formElements[key].value = true;
      } else {
        newState.formElements[key].value = '';
      }
      let element = document.getElementById(
        newState.formElements[key].elementConfig.id
      );
      if (element) {
        element.className = 'form-control';
        element.parentElement.childNodes[2].style.display = 'none';
        element.parentElement.childNodes[3].style.display = 'none';
      }
    }
    newState.isUpdate = false;
    newState.updateId = null;

    this.setState(newState, () => {
      $('#activityModal').modal('show');
    });
  };

  deleteActivity = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      padding: '2em',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', 'Activity has been deleted.', 'success');
        this.props.deleteActivity(data);
      }
    });
  };

  render() {
    let myTable = null;
    if (this.state.categoryId) {
      if (this.props.activities.length !== 0) {
        myTable = (
          <ActivityTable
            activities={this.props.activities}
            onView={(a) => {
              this.props.getSingle({
                type: 'SINGLE_ACTIVITY',
                id: a.id,
              });
              $('#viewDetails').modal('toggle');
            }}
            onEdit={(a) => this.launchUpdate(a)}
            onDelete={(a) => {
              this.deleteActivity({
                type: 'DELETE_ACTIVITY',
                id: a.id,
              });
            }}
          />
        );
      } else {
        myTable = (
          <div className='text-center font-weight-bold mt-2'>
            No Activity is present in above category.
          </div>
        );
      }
    }

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
                      {/* text-center */}
                      <div className='col-xl-12 col-md-12 col-sm-12 col-12 '>
                        <h3>Activity</h3>
                        <div className='text-right'>
                          <button
                            className='btn btn-primary'
                            onClick={(e) => this.addButton(e)}>
                            <Feather name='plus' /> New Activity
                          </button>
                        </div>
                        <div className='row justify-content-center'>
                          <div className='col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12 text-center'>
                            <div
                              className='form-group row'
                              style={{ marginTop: '50px' }}>
                              <label
                                htmlFor='colFormLabelLg'
                                className='col-md-3 col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
                                Category
                              </label>
                              <div className='col-md-9 col-sm-12'>
                                <SingleDropdown
                                  placeholder='Select Category...'
                                  id='category-doc'
                                  change={(e) => this.onCategoryChange(e)}
                                  value={this.state.categoryId}>
                                  {this.props.categories.map((c) => (
                                    <option value={c.id} key={c.id}>
                                      {c.categoryName}
                                    </option>
                                  ))}
                                </SingleDropdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {myTable}
                </div>
                <ActivityDisplay
                  props={this.props}
                  state={this.state}
                  activityButton={this.activityButton}
                  checkHandler={this.checkHandler}
                  inputHandler={this.inputHandler}
                />

                <ActivityView props={this.props} />
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
    categories: state.CRUD.categories,
    noas: state.CRUD.noas,
    activities: state.CRUD.activities,
    activity: state.CRUD.activity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingle: (data) => dispatch(actions.getSingle(data)),
    getData: (data) => dispatch(actions.getData(data)),
    getActivity: (id) => dispatch(actions.getActivityByCategory(id)),
    createActivity: (data) => dispatch(actions.createData(data)),
    updateActivity: (data) => dispatch(actions.updateData(data)),
    deleteActivity: (data) => dispatch(actions.deleteData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
