import React, { useEffect } from "react";
import Datatable from "../Table/Datatable";
import Feather from "../Icons/Feather";

const ActivityTable = (props) => {
  let tableBody = null;
  if (
    props.activities &&
    Array.isArray(props.activities) &&
    props.activities.length !== 0
  ) {
    tableBody = props.activities.map((a) => (
      <tr key={a.id}>
        <td className='text-center'>{a.title}</td>
        <td className='text-center'>{a.sDate}</td>
        <td className='text-center'>{a.eDate}</td>
        <td className='text-center'>{a.hours}</td>
        <td className='text-center'>{a.points}</td>
        <td className='text-center'>
          {a.Category ? a.Category.categoryName : null}
        </td>
        <td className='text-center'>{a.active ? "Active" : "Inactive"}</td>
        <td className='text-center'>{a.docRequired ? "YES" : "NO"}</td>
        <td className='text-center'>
          <ul className='table-controls'>
            <li>
              <span
                style={{ cursor: "pointer" }}
                data-toggle='tooltip'
                data-placement='top'
                title='View'
                onClick={() => props.onView(a)}>
                <div>
                  <Feather name='eye' className='text-primary' />
                </div>
              </span>
            </li>
            <li>
              <span
                onClick={() => props.onEdit(a)}
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
                onClick={() => props.onDelete(a)}
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
  }

  const header = [
    "Name",
    "Start Date",
    "End Date",
    "Hours",
    "Points",
    "Category",
    "Status",
    "Certificate",
    "Action",
  ];

  return (
    <Datatable header={header} id='activity-table'>
      {tableBody}
    </Datatable>
  );
};

export default ActivityTable;
