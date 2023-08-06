import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/CRUD";
import Feather from "../Icons/Feather";
import Modal from "../Modal/Modal";
import SimpleTable from "../Table/SimpleTable";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { checkValidity } from "../../shared/utility";
import Notification from "../Notification/Notification";
import Swal from "sweetalert2";

class Degree extends Component {
  state = {
    degreeName: "",
    updateId: null,
    isUpdate: false,
    oldName: "",
    oldYear: "",
    year: "",
  };

  componentDidMount() {
    this.props.getDegree({ type: "GET_DEGREE" });
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  degreeButton = () => {
    const rules = {
      degreeName: {
        rule: { required: true },
        msg: "Please enter a valid degree name.",
      },
      year: {
        rule: { required: true, isNumeric: true },
        msg: "Year can not be empty.",
      },
    };

    const arr = Object.keys(rules);
    for (let i = 0; i < arr.length; i++) {
      let value = this.state[arr[i]];
      if (!checkValidity(value, rules[arr[i]].rule)) {
        Notification(rules[arr[i]].msg, "danger");
        return;
      }
    }

    console.log("Degree Button" + this.state.isUpdate);
    if (this.state.isUpdate) {
      this.props.updateDegree({
        type: "UPDATE_DEGREE",
        body: { degreeName: this.state.degreeName, years: this.state.year },
        id: this.state.updateId,
      });
    } else {
      console.log("Degree Create");

      this.props.createDegree({
        type: "CREATE_DEGREE",
        body: { degreeName: this.state.degreeName, years: this.state.year },
      });
    }
    this.setState({
      degreeName: "",
      updateId: null,
      isUpdate: false,
      oldName: "",
      oldYear: "",
      year: "",
    });
    $("#degreeModal").modal("hide");
  };

  launchUpdate = (b) => {
    console.log("Launch Update");
    this.setState({
      isUpdate: true,
      updateId: b.id,
      oldName: b.degreeName,
      oldYear: b.years,
      degreeName: "",
      year: "",
    });
    $("#degreeModal").modal("show");
  };

  addDegree = () => {
    this.setState({
      isUpdate: false,
      degreeName: "",
      updateId: null,
      year: "",
    });
    $("#degreeModal").modal("show");
  };

  deleteDegree = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Degree has been deleted.", "success");
        this.props.deleteDegree(data);
      }
    });
  };

  render() {
    let table = null;
    const header = ["#", "Name", "Years", "Action"];
    if (this.props.degrees && this.props.degrees.length !== 0) {
      let tableBody = this.props.degrees.map((b, i) => (
        <tr key={b.id}>
          <td className='text-center'>{i + 1}</td>
          <td className='text-center'>{b.degreeName}</td>

          <td className='text-center'>{b.years}</td>

          <td className='text-center'>
            <ul className='table-controls'>
              <li
              // style={{ paddingRight: "30px" }}
              >
                <span
                  onClick={() => this.launchUpdate(b)}
                  style={{ cursor: "pointer" }}
                  data-toggle='tooltip'
                  data-placement='top'
                  title='Edit'>
                  <div
                  // style={{
                  //   marginLeft: "-25px",
                  // }}
                  >
                    <Feather name='edit-2' className='text-success' />
                  </div>
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    this.deleteDegree({
                      type: "DELETE_DEGREE",
                      id: b.id,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                  data-toggle='tooltip'
                  data-placement='top'
                  title='Delete'>
                  <div
                  // style={{
                  //   marginLeft: "-30px",
                  // }}
                  >
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
      table = (
        <div className='text-center font-weight-bold'>No Degree Found.</div>
      );
    }

    return (
      <>
        {/*  <!--  BEGIN CONTENT AREA  --> */}
        <div id='content' className='main-content'>
          <div className='container' style={{ margin: "auto" }}>
            <div className='container'>
              <div className='row layout-top-spacing'>
                <div
                  id='tableCheckbox'
                  className='col-lg-12 col-12 layout-spacing'>
                  <div className='statbox widget box box-shadow'>
                    <div className='widget-header'>
                      <div className='row'>
                        <div className='col-xl-12 col-md-12 col-sm-12 col-12 text-center'>
                          <h3>Degree</h3>
                          <div style={{ textAlign: "right" }}>
                            <button
                              className='btn btn-primary'
                              id='addTask'
                              onClick={this.addDegree}>
                              <Feather name='plus' className='' /> New Degree
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='widget-content widget-content-area'>
                      {table}
                    </div>
                  </div>
                  {/* Start Modal */}
                  <Modal
                    id='degreeModal'
                    isUpdate={this.state.isUpdate}
                    updateName={["Update Degree", "Add Degree"]}
                    submit={this.degreeButton}>
                    <h5 className=''>
                      {this.state.isUpdate ? "Update Degree" : "Add Degree"}
                    </h5>
                    <form>
                      <div className='row'>
                        {this.state.isUpdate ? (
                          <div className='col-md-12'>
                            <label htmlFor='oldName' className=''>
                              Old Name
                            </label>
                            <div className='d-flex event-title'>
                              <input
                                id='oldName'
                                type='text'
                                placeholder='Enter Degree Name'
                                className='form-control'
                                value={this.state.oldName}
                                disabled
                              />
                            </div>
                          </div>
                        ) : null}
                        {this.state.isUpdate ? (
                          <div className='col-md-12'>
                            <label htmlFor='oldYear' className=''>
                              Old Years
                            </label>
                            <div className='d-flex event-title'>
                              <input
                                id='oldYear'
                                type='text'
                                placeholder='Enter Year'
                                className='form-control'
                                value={this.state.oldYear}
                                disabled
                              />
                            </div>
                          </div>
                        ) : null}

                        <div className='col-md-12'>
                          <label htmlFor='newName' className=''>
                            {this.state.isUpdate ? "New Name" : "Degree Name:"}
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='newName'
                              type='text'
                              placeholder='Enter Degree Name'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, "degreeName")
                              }
                              value={this.state.degreeName}
                            />
                          </div>
                        </div>

                        <div className='col-md-12'>
                          <label htmlFor='newYear' className=''>
                            {this.state.isUpdate ? "New Years" : "Years:"}
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='newYear'
                              type='text'
                              placeholder='Enter Years'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, "year")
                              }
                              value={this.state.year}
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
    degrees: state.CRUD.degrees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDegree: (data) => dispatch(actions.getData(data)),
    createDegree: (data) => dispatch(actions.createData(data)),
    updateDegree: (data) => dispatch(actions.updateData(data)),
    deleteDegree: (data) => dispatch(actions.deleteData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Degree);
