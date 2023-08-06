import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Store/actions/index";
import SingleDropdown from "../../Dropdown/SingleDropdown";
import Datatable from "../../Table/Datatable";
import $ from "jquery";

class RejectedStudents extends Component {
  state = {
    activityId: "",
    branchId: "",
    selectedActivity: null,
  };

  componentDidMount() {
    this.props.getFacultyActivity();
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  onActivityChange = (e) => {
    if (e.target.value == "") {
      return;
    }
    this.inputHandler(e, "activityId");

    let activity = this.props.activities.find((a) => a.id === +e.target.value);

    if (activity && activity.FactActMap && activity.FactActMap.forAll) {
      this.props.getBranch({ type: "GET_BRANCH" });
    } else {
      this.props.getActivityStudents({
        activityDetailId: e.target.value,
        status: false,
      });
    }

    this.setState({ selectedActivity: activity, branchId: "" }, () => {
      $("#faculty-rejected-students-branch").trigger("change");
    });
  };

  onBranchChange = (e) => {
    this.inputHandler(e, "branchId");
    this.props.getActivityStudents({
      branchId: e.target.value,
      activityDetailId: this.state.activityId,
      status: false,
    });
  };

  facultyAction = (activityId, status) => {
    this.props.doFacultyActivityStudent({
      do: { activityId: activityId, status: status, comment: "" },
      get: {
        branchId: this.state.branchId,
        activityDetailId: this.state.activityId,
        status: false,
      },
    });
  };

  render() {
    let table = null;
    let tableBody = null;
    const header = [
      "Full Name",
      "Roll No.",
      "Division",
      "Year",
      "Branch",
      "Degree",
      "Certificate",
      "Action",
    ];

    if (
      this.state.activityId &&
      ((this.state.selectedActivity &&
        this.state.selectedActivity.FactActMap &&
        !this.state.selectedActivity.FactActMap.forAll) ||
        this.state.branchId) &&
      this.props.students &&
      this.props.students.length !== 0
    ) {
      tableBody = this.props.students.map((a) => (
        <tr key={a.id}>
          <td className='text-center'>{a.firstName + " " + a.lastName}</td>
          <td className='text-center'>{a.rollNo}</td>
          <td className='text-center'>{a.division}</td>
          <td className='text-center'>{a.year}</td>
          <td className='text-center'>
            {a.Branch ? a.Branch.branchName : null}
          </td>
          <td className='text-center'>
            {a.Degree ? a.Degree.degreeName : null}
          </td>
          <td className='text-center'>
            <a
              className='btn btn-primary'
              href={a.Activity.certificate}
              target='_blank'>
              View
            </a>
          </td>
          <td className='text-center'>
            <ul className='table-controls'>
              <li>
                <button
                  className='btn btn-success'
                  onClick={() => this.facultyAction(a.Activity.id, true)}>
                  Approve
                </button>
              </li>
              <li>
                <button
                  className='btn btn-warning'
                  onClick={() => this.facultyAction(a.Activity.id, null)}>
                  Pending
                </button>
              </li>
            </ul>
          </td>
        </tr>
      ));

      table = (
        <Datatable id='facultyActivityRejected' header={header}>
          {tableBody}
        </Datatable>
      );
    } else {
      if (
        this.state.activityId &&
        ((this.state.selectedActivity &&
          this.state.selectedActivity.FactActMap &&
          !this.state.selectedActivity.FactActMap.forAll) ||
          this.state.branchId)
      ) {
        table = (
          <div className='row justify-content-center'>
            <h5>No students found.</h5>
          </div>
        );
      }
    }

    let branch = null;

    if (this.state.selectedActivity && this.state.selectedActivity.FactActMap) {
      if (this.state.selectedActivity.FactActMap.forAll) {
        branch = (
          <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 text-center'>
            <div className='form-group row mb-4'>
              <label
                htmlFor='colFormLabelLg'
                className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                Branch
              </label>
              <div className='col-sm-10'>
                <SingleDropdown
                  placeholder='Select Branch...'
                  id='faculty-rejected-students-branch'
                  change={(e) => this.onBranchChange(e)}
                  value={this.state.branchId}>
                  <option value='All'>All</option>
                  {this.props.branches.map((a) => (
                    <option value={a.id} key={a.id}>
                      {a.branchName}
                    </option>
                  ))}
                </SingleDropdown>
              </div>
            </div>
          </div>
        );
      } else {
        branch = (
          <div className='col-6 text-center'>
            <div className='form-group row mb-4'>
              <label className='col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
                You can access only your branch students.
              </label>
            </div>
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
                    <div className='row '>
                      <div className='col-xl-12 col-md-12 col-sm-12 col-12 text-center'>
                        <h3>Rejected Students</h3>
                        <div
                          className='row justify-content-center'
                          style={{ marginTop: "50px" }}>
                          <div className='col-xl-6 col-lg-8 col-md-8 col-sm-8 col-8 text-center'>
                            {this.props.activities.length !== 0 ? (
                              <div className='form-group row mb-4'>
                                <label
                                  htmlFor='colFormLabelLg'
                                  className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                                  Activity
                                </label>
                                <div className='col-sm-10'>
                                  <SingleDropdown
                                    placeholder='Select Activity...'
                                    id='faculty-rejected-students-activity'
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
                                You have no activities.
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='row justify-content-center'>
                          {branch}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='widget-content widget-content-area br-6'>
                    {table}
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
    students: state.facultySection.students,
    activities: state.facultySection.activities,
    branches: state.CRUD.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranch: (data) => dispatch(actions.getData(data)),
    getFacultyActivity: () => dispatch(actions.getFacultyActivity()),
    doFacultyActivityStudent: (data) =>
      dispatch(actions.doFacultyActivityStudent(data)),
    getActivityStudents: (data) => dispatch(actions.getActivityStudents(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RejectedStudents);
