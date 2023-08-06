import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Store/actions/index";
import classes from "./index.css";
import SingleDropdown from "../../Dropdown/SingleDropdown";
import { checkValidity } from "../../../shared/utility";
import Notification from "../../Notification/Notification";
import $ from "jquery";

class ActivityApply extends Component {
  state = {
    activityId: "",
    categoryId: "",
    certificate: "",
  };

  componentDidMount() {
    this.props.getCategory({ type: "GET_CATEGORY" });
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

  enrollForActivity = (e) => {
    e.preventDefault();

    const rule = { required: true, isURL: true };
    if (
      this.props.activity &&
      this.props.activity.docRequired &&
      !checkValidity(this.state.certificate, rule)
    ) {
      Notification("Please enter a valid URL.", "danger");
      return;
    }

    this.props.enrollActivity({
      activityDetailId: this.state.activityId,
      certificate: this.state.certificate,
    });

    this.setState(
      {
        activityId: "",
        categoryId: "",
        certificate: "",
      },
      () => {
        $("#student-activity-apply-activity").trigger("change");
        $("#student-activity-apply-category").trigger("change");
      }
    );
  };

  render() {
    return (
      <>
        {/*  <!--  BEGIN CONTENT AREA  --> */}
        <div id='content' className='main-content'>
          {/* <div className='container' style={{ margin: "auto" }}> */}
          <div className='layout-px-spacing'>
            <div className='row layout-top-spacing'>
              <div className='col-xl-12 col-lg-12 col-sm-12  layout-spacing'>
                <div className='statbox widget box box-shadow'>
                  <div className='widget-header'>
                    <div className='row '>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center'>
                        <h3>Apply to an Activity</h3>
                        <div className='row justify-content-center'>
                          <div className='col-xl-6 col-lg-8 col-md-8 col-sm-8 col-8 text-center'>
                            <div
                              className='form-group row'
                              style={{ marginTop: "50px" }}>
                              <label
                                htmlFor='colFormLabelLg'
                                className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                                Category
                              </label>
                              <div className='col-sm-10'>
                                <SingleDropdown
                                  placeholder='Select Category...'
                                  id='student-activity-apply-category'
                                  change={(e) => {
                                    if (e.target.value) {
                                      this.inputHandler(e, "categoryId");
                                      this.setState({ activityId: "" });
                                      this.props.getActivity(e.target.value);
                                    }
                                  }}
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
                        <div className='row justify-content-center'>
                          {this.state.categoryId ? (
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
                                      id='student-activity-apply-activity'
                                      change={(e) => {
                                        if (e.target.value) {
                                          this.inputHandler(e, "activityId");

                                          this.props.getSingle({
                                            type: "SINGLE_ACTIVITY",
                                            id: e.target.value,
                                          });
                                        }
                                      }}
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
                      </div>
                    </div>
                  </div>
                  {this.state.activityId && this.props.activity ? (
                    <div className='widget-content widget-content-area text-center'>
                      <div className='row justify-content-center'>
                        <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 text-center'>
                          <h5 className='mb-4'>Activity Detail</h5>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              Name :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.title}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              Student Head :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.studentHead
                                ? this.props.activity.studentHead
                                : "-"}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              Start Date :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.sDate}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              End Date :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.eDate}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              Category :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.Category.categoryName}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              Nature Of Activity :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.NOA.title}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              Hours :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.hours}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              Points :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.points}
                            </div>
                          </div>
                          <div className={"row " + classes.Activity}>
                            <div className={"col-4 " + classes.colLabel}>
                              is Certificate required? :
                            </div>
                            <div className={"col-8 " + classes.colValue}>
                              {this.props.activity.docRequired ? "Yes" : "No"}
                            </div>
                          </div>

                          {this.props.activity.docRequired ? (
                            <div>
                              <p
                                className='text-danger'
                                style={{
                                  fontSize: "15px",
                                  marginTop: "20px",
                                  fontWeight: "bold",
                                }}>
                                To apply for this activity, you have to present
                                certificate related to completion of activity.
                              </p>
                              <p
                                className='text-danger'
                                style={{
                                  fontSize: "16px",
                                  marginTop: "5px",
                                  fontWeight: "bold",
                                  textAlign: "left",
                                }}>
                                Instructions: <br />
                                <span style={{ paddingLeft: "20px" }}>
                                  1. Upload your certificate in your Google
                                  Drive.
                                </span>
                                <br />
                                <span style={{ paddingLeft: "20px" }}>
                                  2. Right Click on it using mouse and click on
                                  Share.
                                </span>
                                <br />
                                <span style={{ paddingLeft: "20px" }}>
                                  3. Then change permission from "Restricted" to
                                  "Anyone with the link".
                                </span>
                                <br />
                                <span style={{ paddingLeft: "20px" }}>
                                  4. Click on Copy link.
                                </span>
                                <br />
                                <span style={{ paddingLeft: "20px" }}>
                                  5. Paste the link here below mention box.
                                </span>
                              </p>
                            </div>
                          ) : null}

                          <form
                            style={{ margin: "25px 0" }}
                            onSubmit={(e) => this.enrollForActivity(e)}>
                            {this.props.activity.docRequired ? (
                              <div className='form-group row'>
                                <label
                                  htmlFor='docUrl'
                                  className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                                  Certificate
                                </label>
                                <div className='col-sm-8'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    id='docUrl'
                                    value={this.state.certificate}
                                    onChange={(e) =>
                                      this.inputHandler(e, "certificate")
                                    }
                                    placeholder='Enter Google Drive URL...'
                                    required
                                  />
                                </div>
                              </div>
                            ) : null}
                            <div className='form-group row justify-content-center'>
                              <button className='btn btn-primary'>
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : null}
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
    activity: state.CRUD.activity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingle: (data) => dispatch(actions.getSingle(data)),
    getCategory: (data) => dispatch(actions.getData(data)),
    getActivity: (id) => dispatch(actions.getActivityByCategory(id)),
    enrollActivity: (body) => dispatch(actions.enrollActivity(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityApply);
