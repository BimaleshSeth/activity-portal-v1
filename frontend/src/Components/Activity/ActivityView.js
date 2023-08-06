import React from 'react';
import Feather from '../Icons/Feather';
import Modal from '../Modal/Modal';
import classes from './Activity.css';
import SimpleTable from '../Table/SimpleTable';

const ActivityView = (props) => {
  let facultyTable = null;
  if (
    props.props.activity &&
    props.props.activity.Faculties.length &&
    props.props.activity.Faculties.length !== 0
  ) {
    let tableBody = props.props.activity.Faculties.map((b, i) => (
      <tr key={b.id}>
        <td className='text-center'>{i + 1}</td>
        <td className='text-center'>{b.firstName + ' ' + b.lastName}</td>
        <td className='text-center'>{b.Branch ? b.Branch.branchName : ''}</td>
        <td className='text-center'>{b.FactActMap.forAll ? 'All' : 'Own'}</td>
      </tr>
    ));

    const header = ['#', 'Name', 'Dept', 'Access'];
    facultyTable = <SimpleTable header={header}>{tableBody}</SimpleTable>;
  } else {
    facultyTable = (
      <div className='text-center font-weight-bold'>No faculties assigned.</div>
    );
  }

  let docsTable = null;
  if (
    props.props.activity &&
    props.props.activity.ActivityDetailDocs &&
    props.props.activity.ActivityDetailDocs.length !== 0
  ) {
    let tableBody = props.props.activity.ActivityDetailDocs.map((b, i) => (
      <tr key={b.id}>
        <td className='text-center'>{i + 1}</td>
        <td className='text-center'>{b.title}</td>
        <td className='text-center'>
          <ul className='table-controls'>
            <li>
              <a
                href={b.docUrl}
                target='_blank'
                rel='noreferrer'
                style={{
                  cursor: 'pointer',
                }}
                data-toggle='tooltip'
                data-placement='top'
                title='View'>
                <div>
                  <Feather name='eye' className='text-primary' />
                </div>
              </a>
            </li>
          </ul>
        </td>
      </tr>
    ));

    const header = ['#', 'Name', 'View'];
    docsTable = <SimpleTable header={header}>{tableBody}</SimpleTable>;
  } else {
    docsTable = (
      <div className='text-center font-weight-bold'>No Documents Found.</div>
    );
  }

  return (
    <Modal class='modal-lg' id='viewDetails' onlyView>
      {props.props.activity ? (
        <>
          <h5 className=''>Activity Detail</h5>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>Name :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.title}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>Student Head :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.studentHead
                ? props.props.activity.studentHead
                : '-'}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>Start Date :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.sDate}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>End Date :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.eDate}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>Category :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.Category.categoryName}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>
              Nature Of Activity :
            </div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.NOA.title}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>Hours :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.hours}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>Points :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.points}
            </div>
          </div>

          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>Active :</div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.active ? 'Yes' : 'No'}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div className={'col-4 ' + classes.colLabel}>
              is Certificate required? :
            </div>
            <div className={'col-8 ' + classes.colValue}>
              {props.props.activity.docRequired ? 'Yes' : 'No'}
            </div>
          </div>
          <div className={'row ' + classes.Activity}>
            <div
              className='col-4'
              style={{
                fontSize: '16px',
                // textAlign: "right",
                fontWeight: 'bold',
              }}>
              Associated Faculties :{' '}
            </div>
            <div className={'col-8 ' + classes.colValue}></div>
          </div>
          <div
            className='row justify-content-center'
            style={{ margin: '15px 15px 0 15px' }}>
            {facultyTable}
          </div>
          <div className='row'>
            <div
              className='col-4'
              style={{
                fontSize: '16px',
                // textAlign: "right",
                fontWeight: 'bold',
              }}>
              Associated Documents :
            </div>
            <div className='col-8'></div>
          </div>
          <div
            className='row justify-content-center'
            style={{ margin: '15px 15px 0 15px' }}>
            {docsTable}
          </div>
        </>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default ActivityView;
