import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import Feather from "../Icons/Feather";
import Modal from "../Modal/Modal";
import SimpleTable from "../Table/SimpleTable";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { checkValidity } from "../../shared/utility";
import Notification from "../Notification/Notification";

class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
  };

  componentDidMount() {
    var togglePassword = document.getElementById("toggle-password");
    if (togglePassword) {
      togglePassword.addEventListener("click", function () {
        let x = document.getElementById("oldPassword");
        let y = document.getElementById("newPassword");
        if (x.type === "password") {
          x.type = "text";
          y.type = "text";
        } else {
          x.type = "password";
          y.type = "password";
        }
      });
    }
  }

  inputHandler = (event) => {
    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };

  changePassword = (e) => {
    e.preventDefault();
    if (
      !checkValidity(this.state.oldPassword, {
        required: true,
        isPassword: true,
      })
    ) {
      Notification("Old Password is in invalid format.", "danger");
      return;
    }
    if (
      !checkValidity(this.state.newPassword, {
        required: true,
        isPassword: true,
      })
    ) {
      Notification("New Password is in invalid format.", "danger");
      return;
    }
    if (this.state.oldPassword == this.state.newPassword) {
      Notification("New Password can not be same as Old Password.", "danger");
      return;
    }
    console.log(
      new Object({
        newPassword: this.state.newPassword,
        oldPassword: this.state.oldPassword,
      })
    );

    this.props.userChangePassword({
      newPassword: this.state.newPassword,
      oldPassword: this.state.oldPassword,
    });

    this.setState({
      oldPassword: "",
      newPassword: "",
    });
  };

  render() {
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
                          <h3>Change Password</h3>
                        </div>
                      </div>
                    </div>
                    <div className='widget-content widget-content-area'>
                      <div className='row justify-content-center'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                          <form>
                            <div className='form-row mb-4 justify-content-center'>
                              <div className='form-group col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                <label htmlFor='oldPassword'>
                                  Current Password
                                </label>
                                <input
                                  type='password'
                                  className='form-control'
                                  id='oldPassword'
                                  name='oldPassword'
                                  placeholder='Old Password'
                                  onChange={this.inputHandler}
                                  value={this.state.oldPassword}
                                />
                              </div>
                              <div className='form-group col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                <label htmlFor='newPassword'>
                                  New Password
                                </label>
                                <input
                                  type='password'
                                  className='form-control'
                                  id='newPassword'
                                  name='newPassword'
                                  placeholder='New Password'
                                  onChange={this.inputHandler}
                                  value={this.state.newPassword}
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                              }}>
                              <p className='d-inline-block'>Show Password</p>{" "}
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <label className='switch s-primary'>
                                <input
                                  type='checkbox'
                                  id='toggle-password'
                                  className='d-none'
                                />
                                <span className='slider round'></span>
                              </label>
                            </div>
                            <div className='row justify-content-center'>
                              <button
                                type='submit'
                                className='btn btn-primary mt-3'
                                onClick={this.changePassword}>
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    userChangePassword: (data) => dispatch(actions.userChangePassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
