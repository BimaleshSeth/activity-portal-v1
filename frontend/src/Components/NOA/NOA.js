import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/CRUD";
import Feather from "../Icons/Feather";
import Modal from "../Modal/Modal";
import SimpleTable from "../Table/SimpleTable";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Notification from "../Notification/Notification";
import Swal from "sweetalert2";

class NOA extends Component {
  state = {
    title: "",
    updateId: null,
    isUpdate: false,
    oldName: "",
  };

  componentDidMount() {
    this.props.getNOA({ type: "GET_NOA" });
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  noaButton = () => {
    if (this.state.title == "") {
      Notification("Please enter a valid NOA name.", "danger");
      return;
    }
    console.log("NOA Button" + this.state.isUpdate);
    if (this.state.isUpdate) {
      this.props.updateNOA({
        type: "UPDATE_NOA",
        body: { title: this.state.title },
        id: this.state.updateId,
      });
    } else {
      console.log("NOA Create");

      this.props.createNOA({
        type: "CREATE_NOA",
        body: { title: this.state.title },
      });
    }
    this.setState({
      title: "",
      updateId: null,
      isUpdate: false,
    });
    $("#noaModal").modal("hide");
  };

  launchUpdate = (b) => {
    console.log("Launch Update");
    this.setState({
      isUpdate: true,
      updateId: b.id,
      oldName: b.title,
      title: "",
    });
    $("#noaModal").modal("show");
  };

  addNOA = () => {
    this.setState({
      isUpdate: false,
      title: "",
      updateId: null,
    });
    $("#noaModal").modal("show");
  };
  deleteNOA = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "NOA has been deleted.", "success");
        this.props.deleteNOA(data);
      }
    });
  };

  render() {
    let table = null;
    const header = ["#", "Name", "Action"];
    if (this.props.noas && this.props.noas.length !== 0) {
      let tableBody = this.props.noas.map((b, i) => (
        <tr key={b.id}>
          <td className='text-center'>{i + 1}</td>
          <td className='text-center'>{b.title}</td>
          <td className='text-center'>
            <ul className='table-controls'>
              <li style={{ margin: "0" }}>
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
                    this.deleteNOA({
                      type: "DELETE_NOA",
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
      table = <div className='text-center font-weight-bold'>No NOA Found.</div>;
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
                          <h3>Nature Of Activity ( NOA )</h3>
                          <div className='text-right'>
                            <button
                              className='btn btn-primary'
                              id='addTask'
                              onClick={this.addNOA}>
                              <Feather name='plus' className='' /> New NOA
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
                    id='noaModal'
                    isUpdate={this.state.isUpdate}
                    updateName={["Update NOA", "Add NOA"]}
                    submit={this.noaButton}>
                    <h5 className=''>
                      {this.state.isUpdate ? "Update NOA" : "Add NOA"}
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
                                placeholder='Enter NOA Name'
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
                            {this.state.isUpdate ? "New Name" : "NOA Name:"}
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='newName'
                              type='text'
                              placeholder='Enter NOA Name'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, "title")
                              }
                              value={this.state.title}
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
    noas: state.CRUD.noas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNOA: (data) => dispatch(actions.getData(data)),
    createNOA: (data) => dispatch(actions.createData(data)),
    updateNOA: (data) => dispatch(actions.updateData(data)),
    deleteNOA: (data) => dispatch(actions.deleteData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NOA);
