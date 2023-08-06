//Activity Details
const ACTIVITYDETAIL_CREATE = ["Admin", "SAdmin"];
const ACTIVITYDETAIL_UPDATE = ["Admin", "SAdmin"];
const ACTIVITYDETAIL_DELETE = ["SAdmin"];
const ACTIVITYDETAIL_MAP = ["Admin", "SAdmin"];

const ACTIVITY_DOC_GET = ["Faculty", "Admin", "SAdmin"];
const ACTIVITY_DOC_CREATE = ["Faculty", "Admin", "SAdmin"];
const ACTIVITY_DOC_UPDATE = ["Faculty", "Admin", "SAdmin"];
const ACTIVITY_DOC_DELETE = ["Faculty", "Admin", "SAdmin"];

//Branch
const BRANCH_CREATE = ["SAdmin"];
const BRANCH_UPDATE = ["SAdmin"];
const BRANCH_DELETE = ["SAdmin"];

//Category
const CATEGORY_CREATE = ["Admin", "SAdmin"];
const CATEGORY_UPDATE = ["Admin", "SAdmin"];
const CATEGORY_DELETE = ["SAdmin"];

//Degree
const DEGREE_CREATE = ["SAdmin"];
const DEGREE_UPDATE = ["SAdmin"];
const DEGREE_DELETE = ["SAdmin"];

//Semester
const SEMESTER_CREATE = ["SAdmin"];
const SEMESTER_UPDATE = ["SAdmin"];
const SEMESTER_DELETE = ["SAdmin"];

//Nature Of Activity
const NOA_CREATE = ["SAdmin"];
const NOA_UPDATE = ["SAdmin"];
const NOA_DELETE = ["SAdmin"];

//Student
const STUDENT_CREATE = ["SAdmin"];
const STUDENT_UPDATE = ["SAdmin"];
const STUDENT_DELETE = ["SAdmin"];

const GET_VERIFY_STUDENT = ["SAdmin"];
const VERITY_STUDENT = ["SAdmin"];

const STUDENT_ACTIVITY_STATUS = ["Student"];
const STUDENT_ACTIVITY_APPROVED = ["Student"];
const STUDENT_ACTIVITY_REENROLL = ["Student"];
const STUDENT_ACTIVITY_DELETE = ["Student"];
const STUDENT_CREATE_ACTIVITY = ["Student"];

//Faculty
const FACULTY_CREATE = ["SAdmin"];
const FACULTY_UPDATE = ["SAdmin"];
const FACULTY_DELETE = ["SAdmin"];

const GET_VERIFY_FACULTY = ["SAdmin"];
const VERITY_FACULTY = ["SAdmin"];

const FACULTY_ACTIVITY_DATA = ["Admin", "Faculty"];
const FACULTY_ACTIVITY_STUDENT = ["Admin", "Faculty"];
const FACULTY_ACTIVITY_STATUS_UPDATE = ["Admin", "Faculty"];

//Password Reset
const PASSWORD_RESET = ["SAdmin"];

module.exports = {
  //Activity Details
  ACTIVITYDETAIL_CREATE,
  ACTIVITYDETAIL_UPDATE,
  ACTIVITYDETAIL_DELETE,
  ACTIVITYDETAIL_MAP,
  ACTIVITY_DOC_GET,
  ACTIVITY_DOC_CREATE,
  ACTIVITY_DOC_UPDATE,
  ACTIVITY_DOC_DELETE,
  //Branch
  BRANCH_CREATE,
  BRANCH_UPDATE,
  BRANCH_DELETE,
  //Category
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  //Degree
  DEGREE_CREATE,
  DEGREE_UPDATE,
  DEGREE_DELETE,
  //Semester
  SEMESTER_CREATE,
  SEMESTER_UPDATE,
  SEMESTER_DELETE,
  //NOA
  NOA_CREATE,
  NOA_UPDATE,
  NOA_DELETE,
  //Student
  STUDENT_CREATE,
  STUDENT_UPDATE,
  STUDENT_DELETE,
  GET_VERIFY_STUDENT,
  VERITY_STUDENT,
  STUDENT_ACTIVITY_STATUS,
  STUDENT_ACTIVITY_APPROVED,
  STUDENT_ACTIVITY_REENROLL,
  STUDENT_ACTIVITY_DELETE,
  STUDENT_CREATE_ACTIVITY,
  //Faculty
  FACULTY_CREATE,
  FACULTY_UPDATE,
  FACULTY_DELETE,
  GET_VERIFY_FACULTY,
  VERITY_FACULTY,
  FACULTY_ACTIVITY_DATA,
  FACULTY_ACTIVITY_STUDENT,
  FACULTY_ACTIVITY_STATUS_UPDATE,
  //Password Reset
  PASSWORD_RESET,
};
