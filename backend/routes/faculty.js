const app = require('express').Router();
const sequelize = require('sequelize');
const dbInstance = require('../utils/db');

const { Faculty, Student } = require('../models/users');
const { FactActMap, Activity } = require('../models/mapping');
const { Branch } = require('../models/branch');
const { ActivityDetail } = require('../models/activityDetails');
const { Semester, Degree } = require('../models/degrees');
const { Category } = require('../models/category');
const authorization = require('../middleware/authorization');
const access = require('../access');

app.get('/', async (req, res) => {
  return res.send(await Faculty.findAll());
});

app.get('/overview', async (req, res) => {
  const facultyId = req.user.id;
  const count = await FactActMap.count({ where: { facultyId } });
  return res.send({ activity: count });
});

app.get('/admin/overview', async (req, res) => {
  const faculty = await Faculty.count({
    where: { accessCode: 'Faculty', verified: true },
  });
  const admin = await Faculty.count({ where: { accessCode: 'Admin' } });
  const student = await Student.count({
    where: { verified: true },
  });

  const activity = await ActivityDetail.count();
  const category = await Category.count();

  return res.send({
    users: { faculty: faculty, admin: admin, student: student },
    activity: activity,
    category: category,
  });
});

app.get('/byBranch', async (req, res) => {
  const branches = await Branch.findAll({ attributes: ['branchName', 'id'] });
  const faculties = await Faculty.findAll({
    attributes: ['id', 'firstName', 'lastName', 'branchId'],
  });
  let t1 = {};
  faculties.forEach((f) => {
    if (!t1[f.branchId]) {
      t1[f.branchId] = [];
    }
    t1[f.branchId].push(f);
  });

  let result = [];
  branches.forEach((branch, index) => {
    result.push({
      ...branch.dataValues,
      faculties: t1[branch.id] ? t1[branch.id] : [],
    });
  });
  return res.send(result);
});

app.get('/withDetails', async (req, res) => {
  return res.send(await Faculty.findAll({ include: 'Branch' }));
});

app.get('/:facultyId', async (req, res) => {
  const facultyId = req.params.facultyId;

  const faculty = await Faculty.findByPk(facultyId);

  if (!faculty)
    return res.status(404).send('Faculty with the given ID was not found.');

  return res.send(faculty);
});

app.get('/withDetails/:facultyId', async (req, res) => {
  const facultyId = req.params.facultyId;

  const faculty = await Faculty.findOne({
    where: { id: facultyId },
    include: [
      'Branch',
      { model: ActivityDetail, through: {}, include: ['Category'] },
    ],
  });

  if (!faculty)
    return res.status(404).send('Faculty with the given ID was not found.');

  return res.send(faculty);
});

app.get('/branch/:branchId', async (req, res) => {
  const branchId = req.params.branchId;

  const branch = await Branch.findByPk(branchId);
  if (!branch)
    return res.status(404).send('Branch with the given ID was not found.');

  return res.send(await Faculty.findAll({ where: { branchId } }));
});

app.post('/', authorization(access.FACULTY_CREATE), async (req, res) => {
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
    verified: true,
  });
  return res.send(faculty);
});

app.delete(
  '/:facultyId',
  authorization(access.FACULTY_DELETE),
  async (req, res) => {
    const facultyId = req.params.facultyId;
    const deletedFaculty = await Faculty.findByPk(facultyId);

    if (!deletedFaculty)
      return res.status(404).send('Faculty with the given ID was not found.');

    const isDeleted = await Faculty.destroy({ where: { id: facultyId } });

    if (isDeleted == 1) return res.send(deletedFaculty);
  }
);

app.put(
  '/:facultyId',
  authorization(access.FACULTY_UPDATE),
  async (req, res) => {
    const facultyId = req.params.facultyId;
    const {
      firstName,
      middleName,
      lastName,
      email,
      mobileNo,
      branchId,
      erpId,
      DOB,
      verified,
    } = req.body;

    const isPresent = await Branch.findByPk(branchId);
    if (!isPresent)
      return res.status(404).send('Branch with the given ID was not found.');

    const faculty = await Faculty.findByPk(facultyId);
    if (!faculty)
      return res.status(404).send('Faculty with the given ID was not found.');

    const updatedfaculty = await Faculty.update(
      {
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        branchId,
        erpId,
        DOB,
        verified,
      },
      { where: { id: facultyId } }
    );

    await faculty.reload();

    if (updatedfaculty[0] == 1) return res.send(faculty);
  }
);

app.put(
  '/verify/:facultyId',
  authorization(access.VERITY_FACULTY),
  async (req, res) => {
    const facultyId = req.params.facultyId;

    const faculty = await Faculty.findByPk(facultyId);
    if (!faculty)
      return res.status(404).send('Faculty with the given ID was not found.');

    if (faculty.verified)
      return res.status(400).send('Faculty is already verified.');

    faculty.verified = true;
    await faculty.save();

    return res.send('Faculty is verified successfully.');
  }
);

app.post(
  '/verify',
  authorization(access.GET_VERIFY_FACULTY),
  async (req, res) => {
    const { verified, branchId } = req.body;

    const condition = new Object();

    if (branchId) {
      const isBranch = await Branch.findByPk(branchId);
      if (!isBranch)
        return res.status(404).send('Branch with the given ID was not found.');
      condition['branchId'] = branchId;
    }

    if (verified) {
      condition['verified'] = true;
    } else {
      condition['verified'] = false;
    }

    // console.log(condition);

    const faculties = await Faculty.findAll({
      where: condition,
      include: 'Branch',
    });
    // console.log(faculties);

    return res.send(faculties);
  }
);

//Faculty Section

app.get(
  '/activity/data',
  authorization(access.FACULTY_ACTIVITY_DATA),
  async (req, res) => {
    const facultyId = req.user.id;
    console.log(req.user);
    const activities = await Faculty.findOne({
      where: { id: facultyId },
      include: { model: ActivityDetail, through: { attributes: ['forAll'] } },
    });
    // console.log(activities);
    if (!activities)
      return res.status(404).send('Faculty with the given ID was not found.');
    return res.send(activities);
  }
);

app.post(
  '/activity/student',
  authorization(access.FACULTY_ACTIVITY_STUDENT),
  async (req, res) => {
    const facultyId = req.user.id;
    console.log(facultyId);
    const activityDetailId = req.body.activityDetailId;
    const status = req.body.status;
    const branchId = req.body.branchId;
    const semesterId = req.body.semesterId;
    const degreeId = req.body.degreeId;

    const statusCondition = new Object();

    if (status == null) {
      statusCondition['status'] = null;
    } else if (status == false) {
      statusCondition['status'] = false;
    } else if (status == true) {
      statusCondition['status'] = true;
    } else {
      return res.status(400).send('Invalid status is provided.');
    }

    const isMaped = await FactActMap.findOne({
      where: { facultyId, activityDetailId },
    });
    // console.log(isMaped);
    if (!isMaped)
      return res
        .status(404)
        .send('This faculty do not have access over this activity.');

    const condition = new Object();

    if (isMaped.forAll) {
      if (branchId && branchId != 'All') {
        const isBranch = await Branch.findByPk(branchId);
        if (!isBranch)
          return res
            .status(404)
            .send('Branch with the given ID was not found.');
        condition['branchId'] = branchId;
      }
    } else {
      const faculty = await Faculty.findByPk(facultyId);
      // console.log(faculty);
      condition['branchId'] = faculty.branchId;
    }

    if (semesterId) {
      const isSemester = await Semester.findByPk(semesterId);
      if (!isSemester)
        return res
          .status(404)
          .send('Semester with the given ID was not found.');
      condition['semesterId'] = semesterId;
    }

    if (degreeId) {
      const isDegree = await Degree.findByPk(degreeId);
      if (!isDegree)
        return res.status(404).send('Degree with the given ID was not found.');
      condition['degreeId'] = degreeId;
    }

    // console.log(condition);

    const students = await ActivityDetail.findOne({
      where: { id: activityDetailId },
      include: {
        model: Student,
        through: { where: statusCondition },
        where: condition,
        include: [
          { model: Branch, attributes: ['branchName'] },
          { model: Degree, attributes: ['degreeName'] },
        ],
      },
    });

    // console.log(students);
    if (!students) return res.send([]);
    return res.send(students);
  }
);

app.post(
  '/activity',
  authorization(access.FACULTY_ACTIVITY_STATUS_UPDATE),
  async (req, res) => {
    let { activityId, status, comment } = req.body;
    const verifiedBy = req.user.id;

    let msg;
    if (status == null) {
      msg = 'Student is set to pending for this activity.';
    } else if (status == true) {
      msg = 'Student is successfully approved for this activity.';
    } else if (status == false) {
      msg = 'Student is rejected for this activity.';
    } else {
      return res.status(400).send('Invalid status provided.');
    }

    if (!comment) {
      comment = null;
    }

    const isPresent = await Activity.findByPk(activityId);
    if (!isPresent)
      return res.status(404).send('Activity with the given Id was not found.');

    const isUpdate = await Activity.update(
      { status, comment, verifiedBy },
      { where: { id: isPresent.id } }
    );

    if (isUpdate[0] == 1) return res.send(msg);
  }
);

app.post('/generate/report', async (req, res) => {
  const { branchId, semesterId, degreeId } = req.body;

  const condition = {};

  if (degreeId) {
    const degree = await Degree.findByPk(degreeId);
    if (!degree)
      return res.status(404).send('Degree with the given ID was not found.');
    condition['degreeId'] = degreeId;
  }

  if (branchId) {
    const branch = await Branch.findByPk(branchId);
    if (!branch)
      return res.status(404).send('Branch with the given ID was not found.');
    condition['branchId'] = branchId;
  }

  if (semesterId) {
    const semester = await Semester.findByPk(semesterId);
    if (!semester)
      return res.status(404).send('Semester with the given ID was not found.');
    condition['semesterId'] = semesterId;
  }

  const students = await Student.findAll({
    where: condition,
    group: ['Student.id', 'Activities.semesterId'],
    include: [
      {
        model: Activity,
        where: {
          status: true,
        },
        include: [
          {
            model: ActivityDetail,
            attributes: [],
          },
        ],
        attributes: [
          'semesterId',
          [
            sequelize.fn(
              'SUM',
              sequelize.col('Activities.ActivityDetail.points')
            ),
            'totalPoints',
          ],
        ],
        order: ['Activities.semesterId'],
      },
    ],
    order: ['id'],
  });
 
 
  // if (students.length > 0) 
  return res.send(students);
});

module.exports = app;
