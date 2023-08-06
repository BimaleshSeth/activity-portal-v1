import React from "react";
import classes from "./Faculty.css";
import Datatable from "../Table/Datatable";
import Modal from "../Modal/Modal";
import Feather from "../Icons/Feather";

const StudentView = (props) => {
  let activityTable = null;
  if (
    props.faculty &&
    props.faculty.ActivityDetails.length &&
    props.faculty.ActivityDetails.length !== 0
  ) {
    let tableBody = props.faculty.ActivityDetails.map((activityDetail, i) => (
      <tr key={activityDetail.id}>
        <td className='text-center'>{i + 1}</td>
        <td className='text-center'>{activityDetail.title}</td>
        <td className='text-center'>{activityDetail.Category.categoryName}</td>
        <td className='text-center'>
          {activityDetail.FactActMap.forAll ? "All" : "Own"}
        </td>
      </tr>
    ));

    const header = ["#", "Name", "Category", "Access"];
    activityTable = (
      <Datatable id='faculty-detail-table' header={header}>
        {tableBody}
      </Datatable>
    );
  } else {
    activityTable = (
      <div className='text-center font-weight-bold'>
        Not assigned any activity.
      </div>
    );
  }

  return (
    <>
      {/* <!-- Modal --> */}
      <Modal id='facultyDetail' class='modal-lg' onlyView={true}>
        <h5 className=''>Faculty Detail</h5>
        {props.faculty ? (
          <>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>First Name :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.firstName}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>Middle Name :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.middleName}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>Last Name :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.lastName}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>DOB :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.DOB}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>Email :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.email}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>Mobile No. :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.mobileNo}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>ERP ID :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.erpId}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>Verified :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.verified ? "Yes" : "No"}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div className={"col-4 " + classes.colLabel}>Branch :</div>
              <div className={"col-8 " + classes.colValue}>
                {props.faculty.Branch.branchName}
              </div>
            </div>
            <div className={"row " + classes.Faculty}>
              <div
                className='col-4'
                style={{
                  fontSize: "16px",
                  // textAlign: "right",
                  fontWeight: "bold",
                }}>
                Assigned activities :
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

export default StudentView;
