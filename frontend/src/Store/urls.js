//Branch
export const SINGLE_BRANCH = "/branch/";
export const GET_BRANCH = "/branch/";
export const CREATE_BRANCH = "/branch/";
export const UPDATE_BRANCH = "/branch/";
export const DELETE_BRANCH = "/branch/";

//Degree
export const SINGLE_DEGREE = "/degree/";
export const GET_DEGREE = "/degree/";
export const CREATE_DEGREE = "/degree/";
export const UPDATE_DEGREE = "/degree/";
export const DELETE_DEGREE = "/degree/";

//Semester
export const SINGLE_SEMESTER = "/semester/";
export const GET_SEMESTER = "/semester/";
export const CREATE_SEMESTER = "/semester/";
export const UPDATE_SEMESTER = "/semester/";
export const DELETE_SEMESTER = "/semester/";

//Category
export const SINGLE_CATEGORY = "/category/";
export const GET_CATEGORY = "/category/";
export const CREATE_CATEGORY = "/category/";
export const UPDATE_CATEGORY = "/category/";
export const DELETE_CATEGORY = "/category/";

//Nature of activity
export const SINGLE_NOA = "/natureOfActivity/";
export const GET_NOA = "/natureOfActivity/";
export const CREATE_NOA = "/natureOfActivity/";
export const UPDATE_NOA = "/natureOfActivity/";
export const DELETE_NOA = "/natureOfActivity/";

//Activity
export const SINGLE_ACTIVITY = "/activityDetails/withDetails/";
export const GET_ACTIVITY = "/activityDetails/withDetails/";
export const CREATE_ACTIVITY = "/activityDetails/";
export const UPDATE_ACTIVITY = "/activityDetails/";
export const DELETE_ACTIVITY = "/activityDetails/";

//Faculty Activity Mapping
export const GET_ACTIVITY_BY_CATEGORY = "/activityDetails/category/";
export const GET_ACTIVITY_FACULTY = "/activityDetails/map/";
export const MAP_ACTIVITY_WITH_FACULTY = "/activityDetails/map/";
export const DELETE_ACTIVITY_FACULTY_MAPPING = "/activityDetails/map/";
export const GET_BRANCH_WITH_FACULTY = "/faculty/byBranch/";

//Activity Docs
// export const SINGLE_ACTIVITYDOC = "/activityDetails/docs/";
export const GET_ACTIVITY_DOC = "/activityDetails/docs/";
export const CREATE_ACTIVITY_DOC = "/activityDetails/docs/";
export const UPDATE_ACTIVITY_DOC = "/activityDetails/docs/";
export const DELETE_ACTIVITY_DOC = "/activityDetails/docs/";

//Students
export const SINGLE_STUDENT = "/student/withDetails/";
export const GET_STUDENT = "/student/students/";
export const CREATE_STUDENT = "/student/";
export const UPDATE_STUDENT = "/student/";
export const DELETE_STUDENT = "/student/";
export const GET_VERIFY_STUDENT = "/student/verify/";
export const VERIFY_STUDENT = "/student/verify/";
export const OVERVIEW_STUDENT = "/student/overview";
export const NEXT_SEMESTER = "/student/nextsemester";

//Faculty
export const SINGLE_FACULTY = "/faculty/withDetails/";
export const GET_FACULTY = "/faculty/branch/";
export const CREATE_FACULTY = "/faculty/";
export const UPDATE_FACULTY = "/faculty/";
export const DELETE_FACULTY = "/faculty/";
export const GET_VERIFY_FACULTY = "/faculty/verify/";
export const VERIFY_FACULTY = "/faculty/verify/";
export const OVERVIEW_FACULTY = "/faculty/overview/";
export const OVERVIEW_ADMIN = "/faculty/admin/overview/";

//Faculty Section
export const GET_FACULTY_ACTIVITY = "/faculty/activity/data";
export const GET_FACULTY_ACTIVITY_STUDENT = "/faculty/activity/student/";
export const DO_FACULTY_ACTIVITY_STUDENT = "/faculty/activity";

//Student Section
export const STUDENT_ENROLL_ACTIVITY = "/student/createActivity/";
export const STUDENT_REENROLL_ACTIVITY = "/student/activity/reenroll/";
export const STUDENT_CANCEL_ACTIVITY = "/student/activity/delete/";
export const STUDENT_ACTIVITY_STATUS = "/student/activity/status/";
export const STUDENT_APPROVED_ACTIVITY = "/student/activity/approved/";

//Reports
export const GET_ALL_REPORTS = '/faculty/generate/report';

//Auth
export const USER_LOGIN = "/login";
export const USER_ME = "/login/me";
export const USER_RESET_PASSWORD = "/password/reset";
export const USER_CHANGE_PASSWORD = "/password/change";
