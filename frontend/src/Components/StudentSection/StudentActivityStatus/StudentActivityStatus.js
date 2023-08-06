import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Store/actions/index";
import Datatable from "../../Table/Datatable";
import Swal from "sweetalert2";

class ActivityStatus extends Component {
  state = {};

  componentDidMount() {
    this.props.getActivityStudentStatus();
  }

  cancelAnActivity = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Activity has been deleted.", "success");
        this.props.cancelActivity(id);
      }
    });
  };

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
      "Certificate",
      "Status",
      "Action",
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
            {" "}
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
          <td className='text-center'>
            {a.Activities &&
            a.Activities.length !== 0 &&
            a.Activities[0].status === false ? (
              <span className='shadow-none badge badge-danger'>Rejected</span>
            ) : (
              <span className='shadow-none badge badge-warning'>Pending</span>
            )}
          </td>
          <td className='text-center'>
            <ul className='table-controls'>
              {/* <li>
                <button
                  className='btn btn-success'
                  //   onClick={() => this.facultyAction(a.Activity.id, true)}
                >
                  R
                </button>
              </li> */}
              <li>
                <button
                  className='btn btn-danger'
                  onClick={() => this.cancelAnActivity(a.Activities[0].id)}>
                  Cancel
                </button>
              </li>
            </ul>
          </td>
        </tr>
      ));

      table = (
        <Datatable id='studentActivityStatus' header={header}>
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
                        <h3>Activity Status</h3>
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
    activities: state.studentSection.activityStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActivityStudentStatus: () =>
      dispatch(actions.getActivityStudentStatus()),
    reenrollActivity: (data) => dispatch(actions.reenrollActivity(data)),
    cancelActivity: (id) => dispatch(actions.cancelActivity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityStatus);
