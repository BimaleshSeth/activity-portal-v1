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

class Category extends Component {
  state = {
    categoryName: "",
    updateId: null,
    isUpdate: false,
    oldName: "",
  };

  componentDidMount() {
    this.props.getCategory({ type: "GET_CATEGORY" });
  }

  inputHandler = (event, identifier) => {
    const newState = { ...this.state };
    newState[identifier] = event.target.value;
    this.setState(newState);
  };

  categoryButton = () => {
    if (this.state.categoryName == "") {
      Notification("Please enter a valid category name.", "danger");
      return;
    }

    console.log("Category Button" + this.state.isUpdate);
    if (this.state.isUpdate) {
      this.props.updateCategory({
        type: "UPDATE_CATEGORY",
        body: { categoryName: this.state.categoryName },
        id: this.state.updateId,
      });
    } else {
      console.log("Category Create");
      this.props.createCategory({
        type: "CREATE_CATEGORY",
        body: { categoryName: this.state.categoryName },
      });
    }

    this.setState({
      categoryName: "",
      updateId: null,
      isUpdate: false,
    });
    $("#branchModal").modal("hide");
  };

  launchUpdate = (b) => {
    console.log("Launch Update");
    this.setState({
      isUpdate: true,
      updateId: b.id,
      oldName: b.categoryName,
      categoryName: "",
    });
    $("#branchModal").modal("show");
  };

  addCategory = () => {
    this.setState({
      isUpdate: false,
      categoryName: "",
      updateId: null,
    });
    $("#branchModal").modal("show");
  };

  deleteCategory = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        this.props.deleteCategory(data);
      }
    });
  };

  render() {
    let table = null;
    const header = ["#", "Name", "Action"];
    if (this.props.categories && this.props.categories.length !== 0) {
      let tableBody = this.props.categories.map((b, i) => (
        <tr key={b.id}>
          <td className='text-center'>{i + 1}</td>
          <td className='text-center'>{b.categoryName}</td>
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
                    this.deleteCategory({
                      type: "DELETE_CATEGORY",
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
        <div className='text-center font-weight-bold'>No Category Found.</div>
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
                          <h3>Category</h3>
                          <div className='text-right'>
                            <button
                              className='btn btn-primary'
                              onClick={this.addCategory}>
                              <Feather name='plus' /> New Category
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
                    id='branchModal'
                    isUpdate={this.state.isUpdate}
                    updateName={["Update Category", "Add Category"]}
                    submit={this.categoryButton}>
                    <h5 className=''>
                      {this.state.isUpdate ? "Update Category" : "Add Category"}
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
                                placeholder='Enter Category Name'
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
                              : "Category Name:"}
                          </label>
                          <div className='d-flex event-title'>
                            <input
                              id='newName'
                              type='text'
                              placeholder='Enter Category Name'
                              className='form-control'
                              name='task'
                              onChange={(event) =>
                                this.inputHandler(event, "categoryName")
                              }
                              value={this.state.categoryName}
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
    categories: state.CRUD.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (data) => dispatch(actions.getData(data)),
    createCategory: (data) => dispatch(actions.createData(data)),
    updateCategory: (data) => dispatch(actions.updateData(data)),
    deleteCategory: (data) => dispatch(actions.deleteData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
