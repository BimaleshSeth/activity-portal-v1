import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { checkValidity } from "../../shared/utility";
import Notification from "../Notification/Notification";

class ResetPassword extends Component {
  state = {
    erpId: "",
  };

  inputHandler = (event) => {
    const newState = { ...this.state };

    newState[event.target.name] = event.target.value.toUpperCase();

    this.setState(newState);
  };

  resetPassword = (e) => {
    e.preventDefault();

    if (!checkValidity(this.state.erpId, { required: true, isErpId: true })) {
      Notification("Please enter a valid ERP ID.", "danger");
      return;
    }
    this.props.userResetPassword(this.state.erpId);
    this.setState({
      erpId: "",
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
                          <h3>Reset User Password</h3>
                        </div>
                      </div>
                    </div>
                    <div className='widget-content widget-content-area'>
                      <div className='row justify-content-center'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                          <form>
                            <div className='form-row mb-4 justify-content-center'>
                              <div className='form-group col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                <label htmlFor='erpId'>ERP ID</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='erpId'
                                  name='erpId'
                                  placeholder='Enter ERP ID'
                                  onChange={this.inputHandler}
                                  value={this.state.erpId}
                                  required
                                />
                              </div>
                            </div>

                            <div className='row justify-content-center'>
                              <button
                                type='submit'
                                className='btn btn-primary mt-3'
                                onClick={this.resetPassword}>
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
    userResetPassword: (data) => dispatch(actions.userResetPassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
