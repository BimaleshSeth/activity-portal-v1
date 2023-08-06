import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/CRUD";
import SimpleTable from "../Table/SimpleTable";
import Feather from "../Icons/Feather";
import Modal from "../Modal/Modal";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Notification from "../Notification/Notification";
import Swal from "sweetalert2";

class Branch extends Component {
  state = {
    branchName: "",
    updateId: null,
    isUpdate: false,
    oldName: "",
  };

  componentDidMount() {
    this.props.getBranch({ type: "GET_BRANCH" });
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  branchButton = () => {
    if (this.state.branchName == "") {
      Notification("Please enter a valid branch name.", "danger");
      return;
    }

    console.log("Branch Button" + this.state.isUpdate);

    if (this.state.isUpdate) {
      this.props.updateBranch({
        type: "UPDATE_BRANCH",
        body: { branchName: this.state.branchName },
        id: this.state.updateId,
      });
    } else {
      console.log("Branch Create");

      this.props.createBranch({
        type: "CREATE_BRANCH",
        body: { branchName: this.state.branchName },
      });
    }
    this.setState({
      branchName: "",
      updateId: null,
      isUpdate: false,
    });
    $("#addBranchModal").modal("hide");
  };

  launchUpdate = (b) => {
    console.log("Launch Update");
    this.setState({
      isUpdate: true,
      updateId: b.id,
      oldName: b.branchName,
      branchName: "",
    });
    $("#addBranchModal").modal("show");
  };

  addNewBranch = () => {
    this.setState({
      isUpdate: false,
      branchName: "",
      updateId: null,
    });
    $("#addBranchModal").modal("show");
  };

  deleteBranch = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Branch has been deleted.", "success");
        this.props.deleteBranch(data);
      }
    });
  };

  render() {
    let table = null;
    const header = ["#", "Name", "Action"];
    if (this.props.branches && this.props.branches.length !== 0) {
      let tableBody = this.props.branches.map((b, i) => (
        <tr key={b.id}>
          <td className='text-center'>{i + 1}</td>
          <td className='text-center'>{b.branchName}</td>

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
                    this.deleteBranch({
                      type: "DELETE_BRANCH",
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
        <div className='text-center font-weight-bold'>No Branch Found.</div>
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
                          <h3>Branch</h3>
                          <div style={{ textAlign: "right" }}>
                            <button
                              className='btn btn-primary'
                              onClick={this.addNewBranch}>
                              <Feather name='plus' className='' /> New Branch
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
                    id='addBranchModal'
                    isUpdate={this.state.isUpdate}
                    updateName={["Update Branch", "Add Branch"]}
                    submit={this.branchButton}>
                    <h5 className=''>
                      {this.state.isUpdate ? "Update Branch" : "Add Branch"}
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
                                placeholder='Enter Branch Name'
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
                            {this.state.isUpdate ? "New Name" : "Branch Name:"}
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='newName'
                              type='text'
                              placeholder='Enter Branch Name'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, "branchName")
                              }
                              value={this.state.branchName}
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
    branches: state.CRUD.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranch: (data) => dispatch(actions.getData(data)),
    createBranch: (data) => dispatch(actions.createData(data)),
    updateBranch: (data) => dispatch(actions.updateData(data)),
    deleteBranch: (data) => dispatch(actions.deleteData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
