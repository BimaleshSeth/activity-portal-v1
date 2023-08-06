const app = require("express").Router();
const { Op } = require("sequelize");
const { Student } = require("../models/users");
const { Branch } = require("../models/branch");
const { Degree, Semester } = require("../models/degrees");
const { Activity } = require("../models/mapping");
const { ActivityDetail } = require("../models/activityDetails");
const { Category } = require("../models/category");
const authorization = require("../middleware/authorization");
const access = require("../access");

app.get("/", async (req, res) => {
  return res.send(await Student.findAll());
});

// app.get('/:studentId', async (req, res) => {
//     const studentId = req.params.studentId;

//     // const student = await Student.findByPk(studentId);
//     // console.log('Im in ')
//     const student = await Student.findOne({ where: { id: studentId } });

//     if (!student) return res.status(404).send('Student with the given ID was not found.');

//     return res.send(student);

// });

app.get("/withDetails", async (req, res) => {
  return res.send(
    await Student.findAll({
      order: [["Branch", "branchName"]],
      include: ["Branch", "Semester", "Degree"],
    })
  );
});

app.get("/overview", async (req, res) => {
  const studentId = req.user.id;
  const activity = await Activity.findAll({
    where: { studentId, status: true },
    attributes: [],
    include: [{ model: ActivityDetail, attributes: ["points"] }],
  });
  let total = 0;
  if (activity && activity.length != 0) {
    total = activity.reduce((s, a) => a.ActivityDetail.points, 0);
  }

  return res.send({
    activity: activity.length,
    point: total,
  });
});

app.get("/withDetails/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  // console.log("Im in ");
  // console.log(studentId);
  // const student = await Student.findByPk(studentId);
  // const student = await Activity.findOne({
  //   where: { studentId: studentId },
  //   include: [
  //     "ActivityDetail",
  //     "Semester",
  //     {
  //       model: Student,
  //       include: ["Branch", "Semester", "Degree"],
  //     },
  //   ],
  // });
  const student = await Student.findOne({
    where: { id: studentId },
    include: [
      "Branch",
      "Semester",
      "Degree",
      {
        model: Activity,
        include: ["ActivityDetail", "Semester"],
        // through: { where: { studentId }  },
      },
    ],
  });

  if (!student)
    return res.status(404).send("Student with the given ID was not found.");

  return res.send(student);
});

app.get("/branch/:branchId", async (req, res) => {
  const branchId = req.params.branchId;

  const branch = await Branch.findByPk(branchId);
  if (!branch)
    return res.status(404).send("Branch with the given ID was not found.");

  return res.send(await Student.findAll({ where: { branchId } }));
});

app.get("/degree/:degreeId", async (req, res) => {
  const degreeId = req.params.degreeId;

  const degree = await Degree.findByPk(degreeId);
  if (!degree)
    return res.status(404).send("Degree with the given ID was not found.");

  return res.send(await Student.findAll({ where: { degreeId } }));
});

app.get("/semester/:semesterId", async (req, res) => {
  const semesterId = req.params.semesterId;

  const semester = await Semester.findByPk(semesterId);
  if (!semester)
    return res.status(404).send("Semester with the given ID was not found.");

  return res.send(await Student.findAll({ where: { semesterId } }));
});

app.post("/", authorization(access.STUDENT_CREATE), async (req, res) => {
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
    semesterId,
    erpId,
    DOB,
    rollNo,
    division,
  } = req.body;

  const validBranch = await Branch.findByPk(branchId);
  if (!validBranch)
    return res.status(404).send("Branch with the given ID was not found.");

  const degree = await Degree.findByPk(degreeId);
  if (!degree)
    return res.status(404).send("Degree with the given ID was not found.");

  if (studentType != "Regular" && studentType != "DSE") {
    return res.status(404).send("Student Type not found!");
  }

  // let semesterData;
  // if (studentType == "Regular") {
  //   semesterData = await Semester.findOne({ where: { semester: 1 } });
  // } else if (studentType == "DSE") {
  //   semesterData = await Semester.findOne({ where: { semester: 3 } });
  // } else {
  //   return res.status(404).send("Student Type not found!");
  // }

  // if (!semesterData) return res.status(404).send("Semester  not found.");

  const semester = await Semester.findByPk(semesterId);
  if (!semester)
    return res.status(404).send("Semester with the given ID was not found.");

  let year = Math.round(semester.semester / 2);
  // console.log(DOB);
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
    semesterId,
    verified: true,
  });
  return res.send(student);
});

app.delete(
  "/:studentId",
  authorization(access.STUDENT_DELETE),
  async (req, res) => {
    //student field contains studentId
    const studentId = req.params.studentId;

    const deletedStudent = await Student.findByPk(studentId);
    if (!deletedStudent)
      return res.status(404).send("Student with the given ID was not found.");

    const isDeleted = await Student.destroy({ where: { id: studentId } });
    if (isDeleted == 1) return res.send(deletedStudent);
  }
);

app.put(
  "/:studentId",
  authorization(access.STUDENT_UPDATE),
  async (req, res) => {
    const studentId = req.params.studentId; //student ID
    const {
      firstName,
      middleName,
      lastName,
      email,
      mobileNo,
      studentType,
      degreeId,
      branchId,
      semesterId,
      erpId,
      DOB,
      rollNo,
      division,
      verified,
    } = req.body;

    const isStudent = await Student.findByPk(studentId);
    if (!isStudent)
      return res.status(404).send("Student with the given ID was not found.");
    // console.log(isStudent);

    const validBranch = await Branch.findByPk(branchId);
    if (!validBranch)
      return res.status(404).send("Branch with the given ID was not found.");

    const degree = await Degree.findByPk(degreeId);
    if (!degree)
      return res.status(404).send("Degree with the given ID was not found.");

    if (studentType != "Regular" && studentType != "DSE") {
      return res.status(404).send("Student Type not found!");
    }

    const semester = await Semester.findByPk(semesterId);
    if (!semester)
      return res.status(404).send("Semester with the given ID was not found.");

    let year = Math.round(semester.semester / 2);

    const isUpdate = await Student.update(
      {
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        studentType,
        erpId,
        degreeId,
        branchId,
        DOB,
        rollNo,
        division,
        year,
        semesterId,
        verified,
      },
      { where: { id: studentId } }
    );

    await isStudent.reload();
    // console.log(isStudent);

    if (isUpdate[0] == 1) return res.send(isStudent);
  }
);

app.put(
  "/verify/:studentId",
  authorization(access.VERITY_STUDENT),
  async (req, res) => {
    const studentId = req.params.studentId;

    const student = await Student.findByPk(studentId);
    if (!student)
      return res.status(404).send("Student with the given ID was not found.");

    if (student.verified)
      return res.status(400).send("Student is already verified.");

    student.verified = true;
    await student.save();

    return res.send("Student is verified successfully.");
  }
);

app.post(
  "/verify",
  authorization(access.GET_VERIFY_STUDENT),
  async (req, res) => {
    const { verified, branchId, semesterId, degreeId } = req.body;

    const condition = new Object();

    if (branchId) {
      const isBranch = await Branch.findByPk(branchId);
      if (!isBranch)
        return res.status(404).send("Branch with the given ID was not found.");
      condition["branchId"] = branchId;
    }

    if (semesterId) {
      const isSemester = await Semester.findByPk(semesterId);
      if (!isSemester)
        return res
          .status(404)
          .send("Semester with the given ID was not found.");
      condition["semesterId"] = semesterId;
    }

    if (degreeId) {
      const isDegree = await Degree.findByPk(degreeId);
      if (!isDegree)
        return res.status(404).send("Degree with the given ID was not found.");
      condition["degreeId"] = degreeId;
    }

    if (verified) {
      condition["verified"] = true;
    } else {
      condition["verified"] = false;
    }

    // console.log(condition);

    const students = await Student.findAll({
      where: condition,
      include: ["Branch", "Semester", "Degree"],
    });
    // console.log(students);

    return res.send(students);
  }
);

//
app.get("/students/:branchId/:semesterId", async (req, res) => {
  const { branchId, semesterId } = req.params;
  let condition = { completed: false };
  if (branchId) {
    condition["branchId"] = branchId;
  }
  if (semesterId) {
    condition["semesterId"] = semesterId;
  }
  const branch = await Branch.findByPk(branchId);
  if (!branch)
    return res.status(404).send("Branch with the given ID was not found.");
  const semester = await Semester.findByPk(semesterId);
  if (!semester)
    return res.status(404).send("Semester with the given ID was not found.");

  return res.send(
    await Student.findAll({
      where: condition,
      order: ["division", "rollNo"],
    })
  );
});

// app.get('/students/:branchId/:semesterId', async(req, res) => {
//     const { branchId, semesterId } = req.params;
//     let condition = new Object();
//     if(branchId){
//         condition['branchId'] = branchId;
//     }
//     if(semesterId){
//         condition['semesterId'] = semesterId;
//     }
//     const branch = await Branch.findByPk(branchId);
//     if (!branch) return res.status(404).send('Branch with the given ID was not found.');
//     const semester = await Semester.findByPk(semesterId);
//     if (!semester) return res.status(404).send('Semester with the given ID was not found.');

//     return res.send(await Student.findAll({
//         where: condition,
//         order: ['division', 'rollNo']
//     }));
// });

app.post("/nextsemester", async (req, res) => {
  let { branchId, semesterId, studentIds } = req.body;

  const branch = await Branch.findByPk(branchId);
  if (!branch)
    return res.status(404).send("Branch with the given ID was not found.");
  const semesters = await Semester.findByPk(semesterId);
  if (!semesters)
    return res.status(404).send("Semester with the given ID was not found.");

  if (semesters.semester == 8) {
    await Student.update(
      { completed: true },
      {
        where: {
          id: { [Op.notIn]: studentIds },
          semesterId,
          branchId,
        },
      }
    );
  } else {
    const nextSemester = await Semester.findOne({
      where: { semester: semesters.semester + 1 },
    });

    await Student.update(
      { semesterId: nextSemester.semester },
      {
        where: {
          id: { [Op.notIn]: studentIds },
          semesterId,
          branchId,
        },
      }
    );
  }
  return res.send("Student forwarded to next semester successfully!");
});

// For Student section

app.get(
  "/activity/status",
  authorization(access.STUDENT_ACTIVITY_STATUS),
  async (req, res) => {
    const studentId = req.user.id;

    const isPresent = await Student.findByPk(studentId);
    if (!isPresent)
      return res.status(404).send("Student with the given ID was not found.");

    const activities = await ActivityDetail.findAll({
      include: [
        {
          model: Activity,
          where: {
            studentId,
            status: { [Op.not]: true },
          },
          include: Semester,
        },
        {
          model: Category,
        },
      ],
    });
    // const activities = await Student.findOne({
    //     where:{ id: studentId },
    //     attributes:[],
    //     include: {
    //         model: ActivityDetail,
    //         through: {
    //             where: {
    //                 studentId,
    //                 semesterId: isPresent.semesterId,
    //                 status: { [Op.not]: true }
    //             },
    //         }
    //     }
    // });

    return res.send(activities);
  }
);

app.get(
  "/activity/approved",
  authorization(access.STUDENT_ACTIVITY_APPROVED),
  async (req, res) => {
    const studentId = req.user.id;

    const isPresent = await Student.findByPk(studentId);
    if (!isPresent)
      return res.status(404).send("Student with the given ID was not found.");

    // const activities = await Activity.findAll({ where: { studentId, status: true } });
    const activities = await ActivityDetail.findAll({
      include: [
        {
          model: Activity,
          where: {
            studentId,
            status: true,
          },
          include: Semester,
        },
        {
          model: Category,
        },
      ],
    });

    return res.send(activities);
  }
);

app.put(
  "/activity/reenroll/:activityId",
  authorization(access.STUDENT_ACTIVITY_REENROLL),
  async (req, res) => {
    const activityId = req.params.activityId;
    let { certificate } = req.body;
    const studentId = req.user.id;

    const isPresent = await Activity.findOne({
      where: { id: activityId, studentId },
    });
    if (!isPresent)
      return res.status(404).send("Activity with the given ID was not found.");

    const activityDetail = await ActivityDetail.findByPk(
      isPresent.activityDetailId
    );

    if (!activityDetail.docRequired) {
      certificate = null;
    } else {
      if (!certificate || certificate == "") {
        return res.send("Please provide certificate URL.");
      }
    }

    const student = await Student.findByPk(isPresent.studentId);

    const isUpdate = await Activity.update(
      { status: null, certificate, semesterId: student.semesterId },
      {
        where: { id: activityId },
      }
    );

    if (isUpdate[0] == 1)
      return res.send("Student Reenroll to the activity successfully.");
  }
);

app.delete(
  "/activity/delete/:activityId",
  authorization(access.STUDENT_ACTIVITY_DELETE),
  async (req, res) => {
    const studentId = req.user.id;
    const activityId = req.params.activityId;

    const isPresent = await Activity.findByPk(activityId);
    if (!isPresent)
      return res.status(404).send("Activity with the given ID was not found.");

    const isDeleted = await Activity.destroy({
      where: { id: activityId, studentId },
    });

    if (isDeleted == 1) return res.send(isPresent);
  }
);

app.post(
  "/createActivity",
  authorization(access.STUDENT_CREATE_ACTIVITY),
  async (req, res) => {
    let { activityDetailId, certificate } = req.body;
    const studentId = req.user.id;

    const isStudentPresent = await Student.findByPk(studentId);
    if (!isStudentPresent)
      return res.status(404).send("Something went wrong! Please Re-login.");

    const isActivityPresent = await ActivityDetail.findByPk(activityDetailId);
    if (!isActivityPresent)
      return res
        .status(404)
        .send("Activity is not found. Please refresh the page and try again.");

    if (!isActivityPresent.docRequired) {
      certificate = null;
    } else {
      if (!certificate || certificate == "") {
        return res.send("Please provide certificate URL.");
      }
    }
    const [activity, isNew] = await Activity.findOrCreate({
      where: { studentId, activityDetailId },
      defaults: {
        studentId,
        activityDetailId,
        status: null,
        certificate,
        semesterId: isStudentPresent.semesterId,
      },
    });

    if (!isNew) return res.send("You have already enrolled for this activity.");

    return res.send("You have successfully enrolled for this activity.");
  }
);

module.exports = app;
