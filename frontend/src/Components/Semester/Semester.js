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

class Semester extends Component {
  state = {
    semester: "",
    updateId: null,
    isUpdate: false,
    oldName: "",
  };

  componentDidMount() {
    this.props.getSemester({ type: "GET_SEMESTER" });
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  semesterButton = () => {
    if (
      !checkValidity(this.state.semester, { required: true, isNumeric: true })
    ) {
      Notification("Semester must be a number.", "danger");
      return;
    }

    console.log("Semester Button" + this.state.isUpdate);
    if (this.state.isUpdate) {
      this.props.updateSemester({
        type: "UPDATE_SEMESTER",
        body: { semester: this.state.semester },
        id: this.state.updateId,
      });
    } else {
      console.log("Semester Create");

      this.props.createSemester({
        type: "CREATE_SEMESTER",
        body: { semester: this.state.semester },
      });
    }
    this.setState({
      semester: "",
      updateId: null,
      isUpdate: false,
    });
    $("#semesterModal").modal("hide");
  };

  launchUpdate = (b) => {
    console.log("Launch Update");
    this.setState({
      isUpdate: true,
      updateId: b.id,
      oldName: b.semester,
      semester: "",
    });
    $("#semesterModal").modal("show");
  };

  addSemester = () => {
    this.setState({
      isUpdate: false,
      semester: "",
      updateId: null,
    });
    $("#semesterModal").modal("show");
  };

  deleteSemester = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Semester has been deleted.", "success");
        this.props.deleteSemester(data);
      }
    });
  };

  render() {
    let table = null;
    const header = ["#", "Name", "Action"];
    if (this.props.semesters && this.props.semesters.length !== 0) {
      let tableBody = this.props.semesters.map((b, i) => (
        <tr key={b.id}>
          <td className='text-center'>{i + 1}</td>
          <td className='text-center'>{b.semester}</td>
          <td className='text-center'>
            <ul className='table-controls'>
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
                    this.deleteSemester({
                      type: "DELETE_SEMESTER",
                      id: b.id,
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
      table = (
        <div className='text-center font-weight-bold'>No Semester Found.</div>
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
                          <h3>Semester</h3>
                          <div className='text-right'>
                            <button
                              className='btn btn-primary'
                              onClick={this.addSemester}>
                              <Feather name='plus' /> New Semester
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
                    id='semesterModal'
                    isUpdate={this.state.isUpdate}
                    updateName={["Update Semester", "Add Semester"]}
                    submit={this.semesterButton}>
                    <h5 className=''>
                      {this.state.isUpdate ? "Update Semester" : "Add Semester"}
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
                                placeholder='Enter Semester Name'
                                className='form-control'
                                name='task'
                                value={this.state.oldName}
                                disabled
                              />
                            </div>
                          </div>
                        ) : null}

                        <div className='col-md-12'>
                          <label htmlFor='newName' className=''>
                            {this.state.isUpdate
                              ? "New Name"
                              : "Semester Name:"}
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='newName'
                              type='text'
                              placeholder='Enter Semester Name'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, "semester")
                              }
                              value={this.state.semester}
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
    semesters: state.CRUD.semesters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSemester: (data) => dispatch(actions.getData(data)),
    createSemester: (data) => dispatch(actions.createData(data)),
    updateSemester: (data) => dispatch(actions.updateData(data)),
    deleteSemester: (data) => dispatch(actions.deleteData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Semester);
