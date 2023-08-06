import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Store/actions/index";

import Datatable from "../../Table/Datatable";

class ActivityApproved extends Component {
  state = {};

  componentDidMount() {
    this.props.getApprovedActivity();
  }

  render() {
    let table = null;
    let tableBody = null;
    const header = [
      "Name",
      "Start Date",
      "End Date",
      // "Hours",
      "Points",
      "Category",
      "Semester",
      "Status",
      "Certificate",
      // "Action",
    ];

    if (this.props.activities && this.props.activities.length !== 0) {
      tableBody = this.props.activities.map((a) => (
        <tr key={a.id}>
          <td className='text-center'>{a.title}</td>
          <td className='text-center'>{a.sDate}</td>
          <td className='text-center'>{a.eDate}</td>
          <td className='text-center'>{a.points}</td>
          <td className='text-center'>
            {a.Category ? a.Category.categoryName : null}
          </td>
          <td className='text-center'>
            {a.Activities &&
            a.Activities.length !== 0 &&
            a.Activities[0].Semester
              ? a.Activities[0].Semester.semester
              : null}
          </td>
          <td className='text-center'>
            <span className='shadow-none badge badge-primary'>Approved</span>
          </td>
          <td className='text-center'>
            {a.Activities &&
            a.Activities.length !== 0 &&
            a.docRequired &&
            a.Activities[0].certificate ? (
              <a
                className='btn btn-primary'
                href={a.Activities[0].certificate}
                target='_blank'>
                View
              </a>
            ) : (
              <span className='shadow-none badge badge-warning'>
                Not Needed
              </span>
            )}
          </td>
        </tr>
      ));

      table = (
        <Datatable id='studentActivityApproved' header={header}>
          {tableBody}
        </Datatable>
      );
    } else {
      table = (
        <div className='row justify-content-center'>
          <h5>No activities found.</h5>
        </div>
      );
    }

    return (
      <>
        {/*  <!--  BEGIN CONTENT AREA  --> */}
        <div id='content' className='main-content'>
          <div className='layout-px-spacing'>
            <div className='row layout-top-spacing'>
              <div className='col-xl-12 col-lg-12 col-sm-12  layout-spacing'>
                <div className='statbox widget box box-shadow'>
                  <div className='widget-header'>
                    <div className='row '>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center'>
                        <h3> Approved Activity </h3>
                      </div>
                    </div>
                  </div>

                  <div className='widget-content widget-content-area'>
                    {table}
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
  return {
    activities: state.studentSection.activityApproved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApprovedActivity: () => dispatch(actions.getApprovedActivity()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityApproved);
