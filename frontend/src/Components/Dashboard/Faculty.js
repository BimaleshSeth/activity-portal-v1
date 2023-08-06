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

    // this.props.getFacultyOverview();

    setTimeout(() => {
      this.props.getFacultyOverview();
    }, 1000);

    console.log("fetch overview");

    ["1"].forEach((element) => {
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
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12  layout-spacing'>
                <div className='statbox widget box box-shadow'>
                  <div className='widget-header'>
                    <div className='row'>
                      <div className='col-xl-12 col-md-12 col-sm-12 col-12 text-center pt-4'>
                        <h3>Overview</h3>
                        <div className='icon--counter-container'>
                          <div className='counter-container'>
                            <div
                              className='counter-content'
                              style={{ margin: "auto" }}>
                              <h1 className='ico-counter1 ico-counter'>
                                {this.props.overview.activity}
                              </h1>
                            </div>
                            <i
                              data-feather='activity'
                              className='counter-ico'></i>
                            <p className='ico-counter-text'>
                              Assigned Activity
                            </p>
                          </div>
                        </div>
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
    overview: state.faculty.overview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacultyOverview: () => dispatch(actions.getFacultyOverview()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
