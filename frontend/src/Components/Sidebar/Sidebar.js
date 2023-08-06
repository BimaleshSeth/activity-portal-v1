import { NavLink, Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Sidebar.css";
import { useEffect } from "react";
import myApp from "../../Initial";
import CustomIcon from "../Icons/Custom";
import Feather from "../Icons/Feather";
import "@fortawesome/fontawesome-free/js/all";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
const withoutAuth = false;

function MyCustomNavLink({ label, to }) {
  let match = useRouteMatch({
    path: to,
  });

  return (
    <li className={match ? "active" : ""}>
      <NavLink to={to}>{label}</NavLink>
    </li>
  );
}

const Sidebar = (props) => {
  useEffect(() => {
    myApp();
  }, []);
  return (
    <>
      {/* <!-- BEGIN SIDEBAR  --> */}
      <div className='sidebar-wrapper sidebar-theme'>
        <nav id='sidebar'>
          <div className='shadow-bottom'></div>
          <ul
            className='list-unstyled menu-categories'
            id='accordionExample'
            // style={{ paddingTop: "15px" }}
          >
            <li className='menu'>
              <NavLink
                exact
                to='/'
                activeClassName={classes.active}
                aria-expanded='false'
                className='dropdown-toggle'>
                <div className=''>
                  <Feather name='home'></Feather>
                  <span>Home</span>
                </div>
              </NavLink>
            </li>

            {withoutAuth ||
            (props.user &&
              ['SAdmin', 'Admin'].includes(props.user.accessCode)) ? (
              <>
                {withoutAuth || ['SAdmin'].includes(props.user.accessCode) ? (
                  <>
                    <li className='menu'>
                      <a
                        href='#student'
                        data-toggle='collapse'
                        aria-expanded='false'
                        className='dropdown-toggle'>
                        <div className=''>
                          {CustomIcon.student}
                          <span>Students</span>
                        </div>
                        <div>
                          <Feather name='chevron-right'></Feather>
                        </div>
                      </a>
                      <ul
                        className='collapse submenu list-unstyled'
                        id='student'
                        data-parent='#accordionExample'>
                        {[
                          { label: 'Create Student', link: '/create-student' },
                          { label: 'Fetch Students', link: '/fetch-students' },
                          { label: 'Next Semester', link: '/next-semester' },
                          // { label: "Verify Students", link: "/verify-students" },
                        ].map((item, i) => (
                          <MyCustomNavLink
                            key={i}
                            to={item.link}
                            label={item.label}
                          />
                        ))}
                      </ul>
                    </li>
                    <li className='menu'>
                      <a
                        href='#faculty'
                        data-toggle='collapse'
                        aria-expanded='false'
                        className='dropdown-toggle'>
                        <div className=''>
                          {CustomIcon.teacher}
                          <span>Faculties</span>
                        </div>
                        <div>
                          <Feather name='chevron-right'></Feather>
                        </div>
                      </a>
                      <ul
                        className='collapse submenu list-unstyled'
                        id='faculty'
                        data-parent='#accordionExample'>
                        {[
                          { label: 'Create Faculty', link: '/create-faculty' },
                          {
                            label: 'Fetch Faculties',
                            link: '/fetch-faculties',
                          },
                          // { label: "Verify Faculties", link: "/verify-faculties" },
                        ].map((item, i) => (
                          <MyCustomNavLink
                            key={i}
                            to={item.link}
                            label={item.label}
                          />
                        ))}
                      </ul>
                    </li>
                    <li className='menu'>
                      <a
                        href='#report'
                        data-toggle='collapse'
                        aria-expanded='false'
                        className='dropdown-toggle'>
                        <div className=''>
                          <Feather name='file-text'></Feather>
                          <span>Reports</span>
                        </div>
                        <div>
                          <Feather name='chevron-right'></Feather>
                        </div>
                      </a>
                      <ul
                        className='collapse submenu list-unstyled'
                        id='report'
                        data-parent='#accordionExample'>
                        {[
                          {
                            label: 'By Semester',
                            link: '/report-bysemester',
                          },
                        ].map((item, i) => (
                          <MyCustomNavLink
                            key={i}
                            to={item.link}
                            label={item.label}
                          />
                        ))}
                      </ul>
                    </li>
                    <li className='menu'>
                      <NavLink
                        to='/degree'
                        activeClassName={classes.active}
                        aria-expanded='false'
                        className='dropdown-toggle'>
                        <div className=''>
                          {CustomIcon.diploma}
                          <span>Degree</span>
                        </div>
                      </NavLink>
                    </li>
                    <li className='menu'>
                      <NavLink
                        to='/branch'
                        activeClassName={classes.active}
                        aria-expanded='false'
                        className='dropdown-toggle'>
                        <div className=''>
                          {CustomIcon.branch}
                          <span>Branch</span>
                        </div>
                      </NavLink>
                    </li>
                    <li className='menu'>
                      <NavLink
                        to='/semester'
                        activeClassName={classes.active}
                        aria-expanded='false'
                        className='dropdown-toggle'>
                        <div className=''>
                          <Feather name='layers'></Feather>
                          <span>Semester</span>
                        </div>
                      </NavLink>
                    </li>
                    <li className='menu'>
                      <NavLink
                        to='/noa'
                        activeClassName={classes.active}
                        aria-expanded='false'
                        className='dropdown-toggle'>
                        <div className=''>
                          {CustomIcon.network}
                          <span>NOA</span>
                        </div>
                      </NavLink>
                    </li>
                  </>
                ) : null}

                <li className='menu'>
                  <NavLink
                    to='/category'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      <Feather name='grid'></Feather>
                      <span>Category</span>
                    </div>
                  </NavLink>
                </li>
                <li className='menu'>
                  <NavLink
                    to='/activity'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      <Feather name='activity'></Feather>
                      <span>Activity</span>
                    </div>
                  </NavLink>
                </li>
                <li className='menu'>
                  <NavLink
                    to='/mapfaculty'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      {CustomIcon.sitemap}
                      <span>Map Faculty</span>
                    </div>
                  </NavLink>
                </li>
                <li className='menu'>
                  <NavLink
                    to='/activitydoc'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      {CustomIcon.file}
                      <span>Activity Doc</span>
                    </div>
                  </NavLink>
                </li>
              </>
            ) : null}

            {withoutAuth ||
            (props.user &&
              ['Admin', 'Faculty'].includes(props.user.accessCode)) ? (
              <>
                <li className='menu'>
                  <NavLink
                    to='/pendingStudents'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      {CustomIcon.pending}
                      <span>Pending Students</span>
                    </div>
                  </NavLink>
                </li>
                <li className='menu'>
                  <NavLink
                    to='/rejectedStudents'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      <Feather name='x-circle'></Feather>
                      <span>Rejected Students</span>
                    </div>
                  </NavLink>
                </li>

                <li className='menu'>
                  <NavLink
                    to='/approvedStudents'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      {CustomIcon.check}
                      <span>Approved Students</span>
                    </div>
                  </NavLink>
                </li>
              </>
            ) : null}

            {withoutAuth ||
            (props.user && ['Faculty'].includes(props.user.accessCode)) ? (
              <>
                <li className='menu'>
                  <NavLink
                    to='/facultyactivitydoc'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      {CustomIcon.file}
                      <span>Activity Doc</span>
                    </div>
                  </NavLink>
                </li>
              </>
            ) : null}

            {withoutAuth ||
            (props.user && ['SAdmin'].includes(props.user.accessCode)) ? (
              <>
                <li className='menu'>
                  <NavLink
                    to='/reset-password'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      <Feather name='key'></Feather>
                      <span>Reset Password</span>
                    </div>
                  </NavLink>
                </li>
              </>
            ) : null}

            {withoutAuth ||
            (props.user && ['Student'].includes(props.user.accessCode)) ? (
              <>
                <li className='menu'>
                  <NavLink
                    to='/studentactivityapply'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      <Feather name='plus-circle'></Feather>
                      <span>Apply Activity</span>
                    </div>
                  </NavLink>
                </li>
                <li className='menu'>
                  <NavLink
                    to='/studentactivitystatus'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      <Feather name='clock'></Feather>
                      <span>Activity Status</span>
                    </div>
                  </NavLink>
                </li>
                <li className='menu'>
                  <NavLink
                    to='/studentactivityapproved'
                    activeClassName={classes.active}
                    aria-expanded='false'
                    className='dropdown-toggle'>
                    <div className=''>
                      <Feather name='check-circle'></Feather>
                      <span>Approved Activity</span>
                    </div>
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
          {/* <!--<div className="shadow-bottom"></div> --> */}
        </nav>
      </div>
      {/* <!-- END SIDEBAR  --> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Sidebar);
