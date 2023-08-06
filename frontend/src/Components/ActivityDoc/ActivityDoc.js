import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import Feather from "../Icons/Feather";
import Modal from "../Modal/Modal";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { checkValidity } from "../../shared/utility";
import Notification from "../Notification/Notification";
import Swal from "sweetalert2";

import SingleDropdown from "../Dropdown/SingleDropdown";
import SimpleTable from "../Table/SimpleTable";

class ActivityDoc extends Component {
  state = {
    isUpdate: false,
    title: "",
    updateId: null,
    docUrl: "",
    activityId: "",
    categoryId: "",
  };

  componentDidMount() {
    this.props.getCategory({ type: "GET_CATEGORY" });
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  activityDocButton = () => {
    if (!checkValidity(this.state.title, { required: true })) {
      Notification("Please enter a valid title.", "danger");
      return;
    }
    if (!checkValidity(this.state.docUrl, { required: true, isURL: true })) {
      Notification("Please enter a valid URL.", "danger");
      return;
    }

    const body = {
      title: this.state.title,
      docUrl: this.state.docUrl,
      activityDetailId: this.state.activityId,
    };

    if (this.state.isUpdate) {
      this.props.updateActivityDoc({
        body: body,
        id: this.state.updateId,
      });
    } else {
      this.props.createActivityDoc(body);
    }

    this.setState({
      isUpdate: false,
      title: "",
      updateId: null,
      docUrl: "",
    });

    $("#activityDocModal").modal("hide");
  };

  launchUpdate = (b) => {
    console.log("Launch Update");
    this.setState({
      isUpdate: true,
      updateId: b.id,
      title: b.title,
      docUrl: b.docUrl,
    });
    $("#activityDocModal").modal("show");
  };

  onCategoryChange = (e) => {
    if (e.target.value) {
      this.inputHandler(e, "categoryId");
      this.props.getActivity(e.target.value);
    }
  };

  addDocument = () => {
    this.setState({
      isUpdate: false,
      title: "",
      updateId: null,
      docUrl: "",
    });
    $("#activityDocModal").modal("show");
  };

  deleteActivityDocument = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Document has been deleted.", "success");
        this.props.deleteActivityDoc(data);
      }
    });
  };

  render() {
    let activityDropdown = null;
    if (this.state.categoryId) {
      if (this.props.activities.length !== 0) {
        activityDropdown = (
          <div className='col-xl-8 col-md-8 col-sm-12 col-12 text-center'>
            <div className='form-group row mb-4'>
              <label
                htmlFor='colFormLabelLg'
                className='col-md-3 col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
                Activity
              </label>
              <div className='col-md-9 col-sm-12'>
                <SingleDropdown
                  placeholder='Select Activity...'
                  id='activity-doc'
                  change={(e) => {
                    if (e.target.value) {
                      this.inputHandler(e, 'activityId');
                      this.props.getActivityDoc(e.target.value);
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
          </div>
        );
      } else {
        activityDropdown = (
          <div className='col-xl-8 col-md-8 col-sm-12 col-12 text-center'>
            <div className='text-center font-weight-bold'>
              No Activity is present in above category.
            </div>
          </div>
        );
      }
    }

    const header = ["#", "Name", "Action"];
    let table = null;
    let tableBody = null;
    if (
      this.state.activityId &&
      this.props.activityDocs &&
      this.props.activityDocs.length !== 0
    ) {
      tableBody = this.props.activityDocs.map((b, i) => (
        <tr key={b.id}>
          <td className='text-center'>{i + 1}</td>
          <td className='text-center'>{b.title}</td>
          <td className='text-center'>
            <ul className='table-controls'>
              <li>
                <a
                  href={b.docUrl}
                  target='_blank'
                  rel='noreferrer'
                  style={{ cursor: "pointer" }}
                  data-toggle='tooltip'
                  data-placement='top'
                  title='View'>
                  <div>
                    <Feather name='eye' className='text-primary' />
                  </div>
                </a>
              </li>
              <li>
                <span
                  onClick={() => this.launchUpdate(b)}
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
                  onClick={() => {
                    this.deleteActivityDocument({
                      id: b.id,
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
      if (this.state.activityId) {
        table = (
          <div className='text-center font-weight-bold'>
            No Documents Found.
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
                          <h3>Activity Doc</h3>
                          <div className='row justify-content-center'>
                            <div className='col-xl-8 col-md-8 col-sm-12 col-12 text-center'>
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
                            {activityDropdown}
                          </div>

                          {this.state.activityId ? (
                            <div style={{ textAlign: 'right' }}>
                              <button
                                className='btn btn-primary'
                                id='addTask'
                                onClick={this.addDocument}>
                                <Feather name='plus' /> Add Document
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
                    id='activityDocModal'
                    isUpdate={this.state.isUpdate}
                    updateName={['Update Document', 'Add Document']}
                    submit={this.activityDocButton}>
                    <h5 className=''>
                      {this.state.isUpdate ? 'Update Document' : 'Add Document'}
                    </h5>
                    <form>
                      <div className='row'>
                        <div className='col-md-12'>
                          <label htmlFor='title' className=''>
                            Document Name
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='title'
                              type='text'
                              placeholder='Enter Document Name'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, 'title')
                              }
                              value={this.state.title}
                            />
                          </div>
                        </div>

                        <div
                          className='col-md-12'
                          style={{ marginTop: '10px' }}>
                          <label htmlFor='docUrl' className=''>
                            URL
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='docUrl'
                              type='text'
                              placeholder='Enter URL...'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, 'docUrl')
                              }
                              value={this.state.docUrl}
                            />
                          </div>
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
    activityDocs: state.activity.activityDocs,
    categories: state.CRUD.categories,
    activities: state.activity.activities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (data) => dispatch(actions.getData(data)),
    getActivity: (id) => dispatch(actions.getActivityByCategory(id)),
    getActivityDoc: (id) => dispatch(actions.getActivityDoc(id)),
    createActivityDoc: (body) => dispatch(actions.createActivityDoc(body)),
    updateActivityDoc: (data) => dispatch(actions.updateActivityDoc(data)),
    deleteActivityDoc: (data) => dispatch(actions.deleteActivityDoc(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDoc);
