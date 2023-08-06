import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions";
import feather from "feather-icons";
import $ from "jquery";
import countTo from "jquery-countto";

class StudentDashboard extends Component {
  state = {};

  componentDidMount() {
    feather.replace();
    // this.props.getStudentOverview();

    setTimeout(() => {
      this.props.getStudentOverview();
    }, 1000);

    console.log("fetch overview");

    ["1", "3"].forEach((element) => {
      let value = $(`.ico-counter${element}`).text();
      $(`.ico-counter${element}`).countTo({
        from: 0,
        to: value,
        speed: 1000,
        formatter: function (value, options) {
          return value
            .toFixed(options.decimals)
            .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
        },
      });
    });
  }

  render() {
    return (
      <>
        {/*  <!--  BEGIN CONTENT AREA  --> */}
        <div id='content' className='main-content'>
          <div className='layout-px-spacing'>
            <div className='row layout-top-spacing justify-content-center'>
              <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12  layout-spacing'>
                <div className='statbox widget box box-shadow'>
                  <div className='widget-header'>
                    <div className='row'>
                      <div className='col-xl-12 col-md-12 col-sm-12 col-12 text-center widget-four'>
                        <h3>Overview</h3>
                        <div className='icon--counter-container'>
                          <div className='counter-container'>
                            <div className='counter-content'>
                              <h1 className='ico-counter1 ico-counter'>
                                {this.props.overview.activity}
                              </h1>
                            </div>
                            <i
                              data-feather='activity'
                              className='counter-ico'></i>

                            <p className='ico-counter-text'>Activity</p>
                          </div>

                          <div className='counter-container'>
                            <div className='counter-content'>
                              <h1 className='ico-counter3 ico-counter'>
                                {this.props.overview.point}
                              </h1>
                            </div>

                            <i data-feather='award' className='counter-ico'></i>

                            <p className='ico-counter-text'>Point</p>
                          </div>
                        </div>

                        <div className='widget-heading'>
                          <h5 className=''>Milestone Achieved</h5>
                        </div>
                        <div className='widget-content'>
                          <div className='vistorsBrowser'>
                            <div className='browser-list'>
                              <div className='w-icon'>
                                <i data-feather='activity'></i>
                              </div>
                              <div className='w-browser-details'>
                                <div className='w-browser-info'>
                                  <h6>Activity</h6>
                                  <p className='browser-count'>
                                    {this.props.overview.point + "%"}
                                  </p>
                                </div>
                                <div className='w-browser-stats'>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-gradient-primary'
                                      role='progressbar'
                                      style={{
                                        width: this.props.overview.point + "%",
                                      }}
                                      aria-valuenow='90'
                                      aria-valuemin='0'
                                      aria-valuemax='100'></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div
                          className='row justify-content-center'
                          style={{ marginTop: "50px" }}>
                          <div className='col-xl-6 col-lg-8 col-md-8 col-sm-8 col-8 text-center'></div>
                        </div>
                        <div className='row justify-content-center'></div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className='widget-content widget-content-area br-6'></div> */}
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
    overview: state.student.overview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentOverview: () => dispatch(actions.getStudentOverview()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
