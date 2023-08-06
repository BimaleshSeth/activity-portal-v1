import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import SingleDropdown from '../Dropdown/SingleDropdown';
import Datatable from '../Table/Datatable';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Notification from '../Notification/Notification';
import _ from 'lodash';


class BySemester extends Component {
  state = {
    branchID: '',
    semesterID: '',
    degreeID: '',
    buttonClicked: false,
    title:Array(3)
  };

  componentDidMount() {
    this.props.getData({ type: 'GET_BRANCH' });
    this.props.getData({ type: 'GET_SEMESTER' });
    this.props.getData({ type: 'GET_DEGREE' });
  }

  changeHandler = (event, identifier) => {
    const newState = _.cloneDeep(this.state);
    newState[identifier] = event.target.value;
    newState['buttonClicked'] = false;
    if (identifier === 'degreeID' && newState[identifier]) {
      let degrees = [...this.props.degrees];
      let degree = degrees.find((d) => d.id === +newState[identifier]);
      newState['title'][0] = degree.degreeName;
    }
    if (identifier === 'branchID' && newState[identifier]) {
      let branch = this.props.branches.find(
        (d) => d.id === +newState[identifier]
      );
      newState['title'][1] = branch.branchName;
    }
    if (identifier === 'semesterID' && newState[identifier]) {
      let semester = this.props.semesters.find(
        (d) => d.id === +newState[identifier]
      );
      newState['title'][2] = 'Semester-' + semester.semester;
    }
    this.setState(newState);
  };

  

  fetchStudents = () => {
    console.log('inside called');

    if (this.state.degreeID === '') {
      Notification('Please select degree.', 'danger');
      return;
    }
    if (this.state.branchID === '') {
      Notification('Please select branch.', 'danger');
      return;
    }
    if (this.state.semesterID === '') {
      Notification('Please select semester.', 'danger');
      return;
    }

    if (this.state.branchID !== '' && this.state.semesterID !== '') {
      console.log('inside called condition');
      this.props.getAllReports({
        semesterId: this.state.semesterID,
        branchId: this.state.branchID,
        degreeId: this.state.degreeID,
      });
      this.setState({ buttonClicked: true });
    }
  };

  render() {
    let table = null;
    let tableBody = null;
    const header = ['Full Name', 'Division', 'Roll No.'];

    if (this.state.buttonClicked && this.state.semesterID) {
      for (let i = 1; i <= this.state.semesterID; i++) {
        header.push(`Sem-${i}`);
      }
    }
    header.push('Till Last Sem');
    header.push('Till Current Sem');
    console.log(header);

    if (
      this.state.semesterID !== '' &&
      this.state.branchID !== '' &&
      this.props.allReports &&
      this.props.allReports.length !== 0 &&
      this.state.buttonClicked
    ) {
      tableBody = this.props.allReports.map((student) => {
        let total = 0;
        let currentSemPoints = 0;
        let pointsRow = [];

        if (student.Activities && student.Activities.length > 0) {
          total = student.Activities.reduce((a, b) => {
            // pointsRow.push(<td className='text-center'>{b.totalPoints}</td>);
            return a + +b.totalPoints;
          }, 0);

          pointsRow = student.Activities.map((a, i) => (
            <td key={i} className='text-center'>
              {a.totalPoints}
            </td>
          ));

          for (
            let i = student.Activities.length + 1;
            i <= this.state.semesterID;
            i++
          ) {
            pointsRow.push(
              <td key={i} className='text-center'>
                {'0'}
              </td>
            );
          }

          if (student.Activities.length === this.state.semesterID) {
            currentSemPoints =
              student.Activities[student.Activities.length - 1].totalPoints;
          }
        }
        return (
          <tr key={student.id}>
            <td className='text-center'>
              {student.firstName +
                ' ' +
                // student.middleName +
                // ' ' +
                student.lastName}
            </td>
            <td className='text-center'>{student.division}</td>
            <td className='text-center'>{student.rollNo}</td>
            {/* <td className='text-center'>{student.erpId}</td> */}
            {pointsRow}
            <td className='text-center'>{total - +currentSemPoints}</td>
            <td className='text-center'>{total}</td>
          </tr>
        );
      });
      console.log(tableBody);

      table = (
        <Datatable
          id='fetch-student-report'
          title={this.state.title.join(' ')}
          buttons
          header={header}>
          {tableBody}
        </Datatable>
      );
    } else {
      if (
        this.state.semesterID !== '' &&
        this.state.branchID !== '' &&
        this.props.allReports &&
        this.props.allReports.length === 0 &&
        this.state.buttonClicked
      ) {
        table = (
          <div className='row justify-content-center'>
            <h5>No students found!</h5>
          </div>
        );
      }
    }

    let degree = (
      <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 text-center'>
        <div className='form-group row mb-4'>
          {this.props.degrees && this.props.degrees.length !== 0 ? (
            <>
              <label
                htmlFor='colFormLabelLg'
                className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                Degree
              </label>
              <div className='col-sm-10'>
                <SingleDropdown
                  placeholder='Select Degree...'
                  id='student-degree'
                  change={(e) => this.changeHandler(e, 'degreeID')}
                  value={this.state.degreeID}>
                  {this.props.degrees.map((a) => (
                    <option value={a.id} key={a.id}>
                      {a.degreeName}
                    </option>
                  ))}
                </SingleDropdown>
              </div>
            </>
          ) : (
            <label className='col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
              Degree not found!
            </label>
          )}
        </div>
      </div>
    );

    let branch = (
      <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 text-center'>
        <div className='form-group row mb-4'>
          {this.props.branches && this.props.branches.length !== 0 ? (
            <>
              <label
                htmlFor='colFormLabelLg'
                className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                Branch
              </label>
              <div className='col-sm-10'>
                <SingleDropdown
                  placeholder='Select Branch...'
                  id='student-branch'
                  change={(e) => this.changeHandler(e, 'branchID')}
                  value={this.state.branchID}>
                  {this.props.branches.map((a) => (
                    <option value={a.id} key={a.id}>
                      {a.branchName}
                    </option>
                  ))}
                </SingleDropdown>
              </div>
            </>
          ) : (
            <label className='col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
              Branch not found!
            </label>
          )}
        </div>
      </div>
    );

    let semester = (
      <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 text-center'>
        <div className='form-group row mb-4'>
          {this.props.semesters && this.props.semesters.length !== 0 ? (
            <>
              <label
                htmlFor='colFormLabelLg'
                className='col-sm-2 col-form-label col-form-label-lg font-weight-bold'>
                Semester
              </label>
              <div className='col-sm-10'>
                <SingleDropdown
                  placeholder='Select Semester...'
                  id='student-semester'
                  change={(e) => this.changeHandler(e, 'semesterID')}
                  value={this.state.semesterID}>
                  {this.props.semesters.map((semester) => (
                    <option value={semester.id} key={semester.id}>
                      {'Semester - ' + semester.semester}
                    </option>
                  ))}
                </SingleDropdown>
              </div>
            </>
          ) : (
            <label className='col-sm-12 col-form-label col-form-label-lg font-weight-bold'>
              Semesters not found!
            </label>
          )}
        </div>
      </div>
    );

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
                      <div className='col-xl-12 col-md-12 col-sm-12 col-12 text-center'>
                        <h3>Reports By Semester</h3>

                        <div
                          className='row justify-content-center'
                          style={{ marginTop: '50px' }}>
                          {degree}
                        </div>
                        <div className='row justify-content-center'>
                          {branch}
                        </div>
                        <div className='row justify-content-center'>
                          {semester}
                        </div>
                        <div className='row justify-content-center'>
                          <button
                            onClick={this.fetchStudents}
                            className='btn btn-primary'>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='widget-content widget-content-area br-6'>
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
    semesters: state.CRUD.semesters,
    branches: state.CRUD.branches,
    degrees: state.CRUD.degrees,
    allReports: state.reports.allReports,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(actions.getData(data)),
    getAllReports: (data) => dispatch(actions.getAllReports(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BySemester);
