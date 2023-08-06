import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import Feather from "../Icons/Feather";
import Modal from "../Modal/Modal";
import SingleDropdown from "../Dropdown/SingleDropdown";
import MultipleDropdown from "../Dropdown/MultipleDropdown";
import SimpleTable from "../Table/SimpleTable";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Swal from "sweetalert2";
import Notification from "../Notification/Notification";

class ActivityFaculty extends Component {
  state = {
    activityId: "",
    categoryId: "",
    forAll: false,
    facultyIds: [],
  };

  componentDidMount() {
    this.props.getCategory({ type: "GET_CATEGORY" });
    this.props.getBranchWithFaculty();
  }

  inputHandler = (event, identifier) => {
    console.log(event.target.value);
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
    console.log(newState);
  };

  checkHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.checked;
    this.setState(newState);
    console.log(newState);
  };

  activityFacultyButton = () => {
    if (this.state.facultyIds.length == 0) {
      Notification("Please select faculty.", "danger");
      return;
    }

    const body = {
      facultyIds: this.state.facultyIds,
      forAll: this.state.forAll,
      activityDetailId: this.state.activityId,
    };
    console.log(body);

    this.props.mapActivityWithFaculty(body);

    this.setState(
      {
        forAll: false,
        facultyIds: [],
      },
      () => {
        $("#activity-faculty-activity-faculty").trigger("change");
      }
    );
    $("#activityFacultyModal").modal("hide");
  };

  onCategoryChange = (e) => {
    if (e.target.value) {
      this.inputHandler(e, "categoryId");
      this.props.getActivity(e.target.value);
      this.setState({ activityId: "" }, () => {
        $("#activity-faculty-activity").trigger("change");
      });
    }
  };

  onActivityChange = (e) => {
    if (e.target.value) {
      this.inputHandler(e, "activityId");
      this.props.getActivityFaculty(e.target.value);
    }
  };

  mapFaculty = () => {
    this.setState(
      {
        forAll: false,
        facultyIds: [],
      },
      () => {
        $("#activity-faculty-activity-faculty").trigger("change");
      }
    );
    $("#activityFacultyModal").modal("show");
  };

  deleteActivityFacultyMapping = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Faculty mapping has been deleted.", "success");
        this.props.deleteActivityFacultyMapping(data);
      }
    });
  };

  render() {
    let faculties = <option value=''>No Faculty Present.</option>;
    if (
      this.props.branchWithFaculty &&
      this.props.branchWithFaculty.length !== 0
    ) {
      // faculties = this.props.branchWithFaculty.map((b) => {
      //   if (b.faculties && b.faculties.length !== 0) {
      //     return (
      //       <optgroup label={b.branchName} key={b.id}>
      //         {b.faculties.map((f) => (
      //           <option key={f.id} value={f.id}>
      //             {f.firstName + " " + f.lastName}
      //           </option>
      //         ))}
      //       </optgroup>
      //     );
      //   } else {
      //     return <></>;
      //   }
      // });
      let data = [];
      this.props.branchWithFaculty.forEach((b) => {
        if (b.faculties && b.faculties.length !== 0) {
          data.push(
            <optgroup label={b.branchName} key={b.id}>
              {b.faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.firstName + " " + f.lastName}
                </option>
              ))}
            </optgroup>
          );
        }
      });
      faculties = [...data];
    }

    let table = null;
    let tableBody = null;
    let header = ["#", "Name", "Dept", "Access", "Action"];
    if (
      this.state.categoryId &&
      this.state.activityId &&
      this.props.activityFaculties &&
      this.props.activityFaculties.length !== 0
    ) {
      tableBody = this.props.activityFaculties.map((b, i) => (
        <tr key={b.id}>
          <td className='text-center'>{i + 1}</td>
          <td className='text-center'>{b.firstName + " " + b.lastName}</td>
          <td className='text-center'>{b.Branch ? b.Branch.branchName : ""}</td>
          <td className='text-center'>{b.FactActMap.forAll ? "All" : "Own"}</td>
          <td className='text-center'>
            <ul className='table-controls'>
              <li>
                <span
                  onClick={() => {
                    this.deleteActivityFacultyMapping({
                      id: b.FactActMap.id,
                      activityDetailId: this.state.activityId,
                    });
                  }}
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

      table = <SimpleTable header={header}>{tableBody}</SimpleTable>;
    } else {
      if (this.state.categoryId && this.state.activityId) {
        table = (
          <div className='row justify-content-center'>
            <h5>No faculties assigned.</h5>
          </div>
        );
      }
    }

    return (
      <>
        {/*  <!--  BEGIN CONTENT AREA  --> */}
        <div id='content' className='main-content'>
          <div className='container' style={{ margin: 'auto' }}>
            <div className='container'>
              <div className='row layout-top-spacing'>
                <div
                  id='tableCheckbox'
                  className='col-lg-12 col-12 layout-spacing'>
                  <div className='statbox widget box box-shadow'>
                    <div className='widget-header'>
                      <div className='row '>
                        <div className='col-xl-12 col-md-12 col-sm-12 col-12 text-center'>
                          <h3>Activity - Faculty Mapping</h3>
                          <div className='row justify-content-center'>
                            <div className='col-xl-8 col-md-8 col-sm-12 col-12 text-center'>
                              <div
                                className='form-group row'
                                style={{ marginTop: '50px' }}>
                                <label
                                  htmlFor='activity-faculty-category'
                                  className='col-md-3 col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
                                  Category
                                </label>
                                <div className='col-md-9 col-sm-12'>
                                  <SingleDropdown
                                    placeholder='Select Category...'
                                    id='activity-faculty-category'
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
                            {this.state.categoryId ? (
                              <div className='col-xl-8 col-md-8 col-sm-12 col-12 text-center'>
                                {this.props.activities.length !== 0 ? (
                                  <div
                                    className='form-group row mb-4'
                                    style={{ marginTop: '20px' }}>
                                    <label
                                      htmlFor='activity-faculty-activity'
                                      className='col-md-3 col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
                                      Activity
                                    </label>
                                    <div className='col-md-9 col-sm-12'>
                                      <SingleDropdown
                                        placeholder='Select Activity...'
                                        id='activity-faculty-activity'
                                        change={(e) => this.onActivityChange(e)}
                                        value={this.state.activityId}>
                                        {this.props.activities.map((a) => (
                                          <option value={a.id} key={a.id}>
                                            {a.title}
                                          </option>
                                        ))}
                                      </SingleDropdown>
                                    </div>
                                  </div>
                                ) : (
                                  <div className='text-center font-weight-bold'>
                                    No Activity is present in above category.
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </div>

                          {this.state.activityId ? (
                            <div style={{ textAlign: 'right' }}>
                              <button
                                className='btn btn-primary'
                                id='addTask'
                                onClick={this.mapFaculty}>
                                <Feather name='plus' className='' /> Map Faculty
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className='widget-content widget-content-area'>
                      {table}
                    </div>
                  </div>
                  {/* Start Modal */}
                  <Modal
                    id='activityFacultyModal'
                    isUpdate={false}
                    updateName={['', 'Add Faculty']}
                    submit={this.activityFacultyButton}>
                    <h5 className=''>Add Faculty</h5>
                    <form>
                      <div className='form-group row mb-4  '>
                        <label
                          htmlFor='colFormLabelLg'
                          className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                          Faculties
                        </label>
                        <div className='col-sm-10 text-center'>
                          <MultipleDropdown
                            placeholder='Select Faculty...'
                            id='activity-faculty-activity-faculty'
                            change={(values) => {
                              console.log(values);
                              this.setState({ facultyIds: values });
                            }}
                            value={this.state.facultyIds}>
                            {faculties}
                          </MultipleDropdown>
                        </div>
                      </div>

                      <div className='form-row' style={{ marginTop: '50px' }}>
                        <div className='form-group col-md-4 text-right'>
                          <div className='form-check pl-0'>
                            <label
                              className='switch s-icons s-outline  s-outline-primary  mb-4 mr-2'
                              style={{ marginRight: 0 }}>
                              <input
                                type='checkbox'
                                checked={this.state.forAll}
                                onChange={(e) => this.checkHandler(e, 'forAll')}
                              />
                              <span className='slider round'></span>
                            </label>
                          </div>
                        </div>
                        <div className='form-group col-md-8'>
                          <label
                            className='font-weight-bold'
                            style={{
                              fontSize: '16px',
                              marginLeft: '-20px',
                            }}>
                            {this.state.forAll
                              ? 'Access to all departments'
                              : 'Access to their own department'}
                          </label>
                        </div>
                      </div>
                    </form>
                  </Modal>
                  {/* End Modal */}
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
    categories: state.CRUD.categories,
    activities: state.activity.activities,
    activityFaculties: state.activity.activityFaculties,
    branchWithFaculty: state.activity.branchWithFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (data) => dispatch(actions.getData(data)),
    getActivity: (id) => dispatch(actions.getActivityByCategory(id)),
    getActivityFaculty: (id) => dispatch(actions.getActivityFaculty(id)),
    getBranchWithFaculty: () => dispatch(actions.getBranchWithFaculty()),
    mapActivityWithFaculty: (body) =>
      dispatch(actions.mapActivityWithFaculty(body)),
    deleteActivityFacultyMapping: (data) =>
      dispatch(actions.deleteActivityFacultyMapping(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFaculty);
