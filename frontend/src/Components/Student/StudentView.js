import React from "react";
import classes from "./Student.css";
import Datatable from "../Table/Datatable";
import Modal from "../Modal/Modal";
import Feather from "../Icons/Feather";

const getStatusLabel = (status) => {
  console.log(status);
  if (status == null) {
    return <span className='shadow-none badge badge-warning'>Pending</span>;
  } else if (status == false) {
    return <span className='shadow-none badge badge-danger'>Rejected</span>;
  } else if (status == true) {
    return <span className='shadow-none badge badge-success'>Approved</span>;
  }
};

const ActivityView = (props) => {
  let activityTable = null;
  if (
    props.student &&
    props.student.Activities.length &&
    props.student.Activities.length !== 0
  ) {
    let tableBody = props.student.Activities.map((activity, i) => (
      <tr key={activity.id}>
        <td className='text-center'>{i + 1}</td>
        <td className='text-center'>{activity.ActivityDetail.title}</td>
        <td className='text-center'>{activity.Semester.semester}</td>
        <td className='text-center'>
          {activity ? getStatusLabel(activity.status) : null}
        </td>
        <td className='text-center'>
          {activity.ActivityDetail &&
          activity.ActivityDetail.docRequired &&
          activity.certificate ? (
            <a
              className='btn btn-primary'
              href={activity.certificate}
              target='_blank'>
              View
            </a>
          ) : (
            <span className='shadow-none badge badge-warning'>Not Needed</span>
          )}
        </td>
      </tr>
    ));

    const header = ["#", "Name", "Semester", "Status", "Certificate"];
    activityTable = (
      <Datatable id='student-detail-table' header={header}>
        {tableBody}
      </Datatable>
    );
  } else {
    activityTable = (
      <div className='text-center font-weight-bold'>
        Not participated in any activity.
      </div>
    );
  }

  return (
    <>
      {/* <!-- Modal --> */}
      <Modal id='studentViewModal' class='modal-lg' onlyView={true}>
        <h5 className=''>Student Detail</h5>
        {props.student ? (
          <>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>First Name :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.firstName}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Middle Name :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.middleName}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Last Name :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.lastName}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>DOB :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.DOB}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Email :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.email}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Mobile No. :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.mobileNo}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>ERP ID :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.erpId}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Roll No. :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.rollNo}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Divison :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.division}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Student Type :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.studentType}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Verified :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.verified ? "Yes" : "No"}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Semester :</div>
              <div className={"col-8 " + classes.colValue}>
                {"Semester - " + props.student.Semester.semester}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Branch :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.Branch.branchName}
              </div>
            </div>
            <div className={"row " + classes.Student}>
              <div className={"col-4 " + classes.colLabel}>Degree :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.student.Degree.degreeName}
              </div>
            </div>

            <div className={"row " + classes.Student}>
              <div
                className='col-4'
                style={{
                  fontSize: "16px",
                  // textAlign: "right",
                  fontWeight: "bold",
                }}>
                Participated in activities :
              </div>
              <div className={"col-8 " + classes.colValue}></div>
            </div>
            <div
              className='row justify-content-center'
              style={{ margin: "15px 15px 0 15px" }}>
              {activityTable}
            </div>
          </>
        ) : null}
      </Modal>

      {/* End Modal */}
    </>
  );
};

export default ActivityView;
