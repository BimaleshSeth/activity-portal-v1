const express = require('express');
const cors = require('cors');
const app = express();
// const multer = require('multer');
const sequelize = require('./utils/db');
const config = require('config');
const Sequelize = require('sequelize');

//middleware
const authentication = require('./middleware/authentication');
const authorization = require('./middleware/authorization');

//Routes
const category = require('./routes/category');
const branch = require('./routes/branch');
const student = require('./routes/student');
const faculty = require('./routes/faculty');
const activityDetails = require('./routes/activityDetails');
const degree = require('./routes/degree');
const semester = require('./routes/semester');
const login = require('./routes/login');
const userPassword = require('./routes/userPassword');

const natureOfActivity = require('./routes/natureOfActivity');

//model
const { Category } = require('./models/category');
const { NOA } = require('./models/natureOfActivity');
const { Branch } = require('./models/branch');
const {
  ActivityDetail,
  ActivityDetailDoc,
} = require('./models/activityDetails');
const { Student, Faculty } = require('./models/users');
const { Degree, Semester } = require('./models/degrees');
const { FactActMap, Activity } = require('./models/mapping');

app.use(express.json());
app.use(cors({ exposedHeaders: ['x-auth-token'] }));

//Necessary Requirements
(async () => {

  setTimeout(async () => {
    let d = await Branch.findOne({
      where: { branchName: 'Information Technology' },
    });
    if (!d) {
      d = await Branch.create({ branchName: 'Information Technology' });
    }
    const user = await Faculty.findOne({ where: { accessCode: 'SAdmin' } });
    if (!user) {
      await Faculty.create({
        firstName: 'Bimalesh',
        middleName: 'Jawahir',
        lastName: 'Seth',
        DOB: '21/03/2001',
        email: 'sethbimalesh@gmail.com',
        mobileNo: '7039581571',
        erpId: 'E123456789',
        password: 'E123456789',
        accessCode: 'SAdmin',
        verified: true,
        branchId: d.id,
      });
    }

    const semesters = await Semester.findAll();
    // console.log(semesters);
    if (semesters && semesters.length == 0) {
      // console.log('I\'m In');
      let mysemesters = await Semester.bulkCreate([
        { semester: 1 },
        { semester: 2 },
        { semester: 3 },
        { semester: 4 },
        { semester: 5 },
        { semester: 6 },
        { semester: 7 },
        { semester: 8 },
      ]);
      //    console.log(mysemesters);
    }

    const noa = await NOA.findAll();
    // console.log(noa);
    if (noa && noa.length == 0) {
      // console.log('I\'m In');
      let mynoa = await NOA.bulkCreate([
        { title: 'Helping local schools to achieve good' },
        { title: 'Preparing an actionable business' },
        { title: 'Developing Sustainable Water' },
        { title: 'Tourism Promotion Innovative' },
        { title: 'Promotion of Appropriate Technologies ' },
        { title: 'Reduction in Energy Consumption' },
        { title: 'To Skill rural population' },
        { title: 'Facilitating 100% Digitized money' },
        { title: 'Setting of the information imparting' },
        { title: 'Developing and managing efficient garbage' },
        { title: 'To assist the marketing of rural produce ' },
        { title: 'Food preservation/packaging' },
        { title: 'Automation of local activities' },
        { title: 'Spreading public awareness under rural outreach program' },
        {
          title:
            'Contribution to any national level initiative of Government of India. For e.g. Digital',
        },
      ]);
      //    console.log(mynoa);
    }
  }, 60000);

})();

//Routes without authentication
app.use('/login', login);

//Self Registration Section

//Student
app.post('/student/selfRegistration', async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    password,
    email,
    mobileNo,
    studentType,
    degreeId,
    branchId,
    erpId,
    DOB,
    rollNo,
    division,
    year,
  } = req.body;

  const validBranch = await Branch.findByPk(branchId);
  if (!validBranch)
    return res.status(404).send('Branch with the given ID was not found.');

  const degree = await Degree.findByPk(degreeId);
  if (!degree)
    return res.status(404).send('Degree with the given ID was not found.');

  let semesterData;
  if (studentType == 'Regular') {
    semesterData = await Semester.findOne({ where: { semester: 1 } });
  } else if (studentType == 'DSE') {
    semesterData = await Semester.findOne({ where: { semester: 3 } });
  } else {
    return res.status(404).send('Student Type not found!');
  }

  if (!semesterData) return res.status(404).send('Semester not found.');

  const student = await Student.create({
    firstName,
    middleName,
    lastName,
    email,
    password,
    mobileNo,
    studentType,
    erpId,
    degreeId,
    branchId,
    DOB,
    rollNo,
    division,
    year,
    semesterId: semesterData.id,
  });

  return res.send(student);
});

//Faculty
app.post('/faculty/selfRegistration', async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    password,
    email,
    mobileNo,
    branchId,
    erpId,
    DOB,
  } = req.body;

  const validBranch = await Branch.findByPk(branchId);
  if (!validBranch)
    return res.status(404).send('Branch with the given ID was not found.');

  const faculty = await Faculty.create({
    firstName,
    middleName,
    lastName,
    password,
    email,
    mobileNo,
    branchId,
    erpId,
    DOB,
  });

  return res.send(faculty);
});

app.use(authentication);

// app.use("/certificates", express.static("certificates"));

app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  res.send('Ok');
});

//Routes with Authentication
app.use('/category', category);
app.use('/natureOfActivity', natureOfActivity);
app.use('/branch', branch);
app.use('/degree', degree);
app.use('/semester', semester);
app.use('/activityDetails', activityDetails);
app.use('/faculty', faculty);

app.use('/student', student);
app.use('/password', userPassword);

//Contraints

//ActivityDetail and Category
Category.hasMany(ActivityDetail, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ActivityDetail.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//ActivityDetail and NOA
NOA.hasMany(ActivityDetail, {
  foreignKey: {
    name: 'noaId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ActivityDetail.belongsTo(NOA, {
  foreignKey: {
    name: 'noaId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Degree and Student
Degree.hasMany(Student, {
  foreignKey: {
    name: 'degreeId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Student.belongsTo(Degree, {
  foreignKey: {
    name: 'degreeId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Semester and Student
Semester.hasMany(Student, {
  foreignKey: {
    name: 'semesterId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Student.belongsTo(Semester, {
  foreignKey: {
    name: 'semesterId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Student and Activity
Student.hasMany(Activity, {
  foreignKey: {
    name: 'studentId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Activity.belongsTo(Student, {
  foreignKey: {
    name: 'studentId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//ActivityDetail and Activity
ActivityDetail.hasMany(Activity, {
  foreignKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Activity.belongsTo(ActivityDetail, {
  foreignKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//ActivityDetail and ActivityDetailDoc
ActivityDetail.hasMany(ActivityDetailDoc, {
  foreignKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ActivityDetailDoc.belongsTo(ActivityDetail, {
  foreignKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Semester  and Activity
Semester.hasMany(Activity, {
  foreignKey: {
    name: 'semesterId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Activity.belongsTo(Semester, {
  foreignKey: {
    name: 'semesterId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Faculty  and Activity
Faculty.hasMany(Activity, {
  foreignKey: {
    name: 'verifiedBy',
    allowNull: true,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Activity.belongsTo(Faculty, {
  foreignKey: {
    name: 'verifiedBy',
    allowNull: true,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Branch and Student
Branch.hasMany(Student, {
  foreignKey: {
    name: 'branchId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Student.belongsTo(Branch, {
  foreignKey: {
    name: 'branchId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Branch and Faculty
Branch.hasMany(Faculty, {
  foreignKey: {
    name: 'branchId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Faculty.belongsTo(Branch, {
  foreignKey: {
    name: 'branchId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Faculty and ActivityDetail
Faculty.belongsToMany(ActivityDetail, {
  through: FactActMap,
  foreignKey: {
    name: 'facultyId',
    allowNull: false,
  },
  otherKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
});

ActivityDetail.belongsToMany(Faculty, {
  through: FactActMap,
  foreignKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
  otherKey: {
    name: 'facultyId',
    allowNull: false,
  },
});

//Student and ActivityDetail
Student.belongsToMany(ActivityDetail, {
  through: Activity,
  foreignKey: {
    name: 'studentId',
    allowNull: false,
  },
  otherKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
});

ActivityDetail.belongsToMany(Student, {
  through: Activity,
  foreignKey: {
    name: 'activityDetailId',
    allowNull: false,
  },
  otherKey: {
    name: 'studentId',
    allowNull: false,
  },
});

//Tables synchronization
sequelize
  // .sync({ force: true })
  // .sync({ alter: true })
  .sync()
  .then((result) => {
    // console.log(result);
    // console.log(result.modelManager.models);
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });

const port = process.env.PORT || config.get('port');
// const port = 8080;
app.listen(port, () => console.log(`Listening on localhost:${port}`));
