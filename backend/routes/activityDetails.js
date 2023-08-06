const app = require("express").Router();
const { Op } = require("sequelize");
const {
  ActivityDetail,
  ActivityDetailDoc,
} = require("../models/activityDetails");
const { Category } = require("../models/category");
const { NOA } = require("../models/natureOfActivity");
const { FactActMap } = require("../models/mapping");
const { Faculty } = require("../models/users");
const authorization = require("../middleware/authorization");
const access = require("../access");
const { Branch } = require("../models/branch");

app.get("/", async (req, res) => {
  res.send(await ActivityDetail.findAll({ order: ["title"] }));
});

app.get("/withDetails", async (req, res) => {
  res.send(
    await ActivityDetail.findAll({
      order: ["title"],
      include: ["Category", "NOA"],
    })
  );
});

app.get("/:activityDetailId", async (req, res) => {
  const activityDetailId = req.params.activityDetailId;
  const activitydetail = await ActivityDetail.findByPk(activityDetailId);

  if (!activitydetail)
    return res
      .status(404)
      .send("Activity Details with the given ID was not found.");

  return res.send(activitydetail);
});

app.get("/withDetails/:activityDetailId", async (req, res) => {
  const activityDetailId = req.params.activityDetailId;
  const activitydetail = await ActivityDetail.findOne({
    where: { id: activityDetailId },
    include: [
      {
        model: Category,
        attributes: ["categoryName"],
      },
      {
        model: NOA,
      },
      {
        model: Faculty,
        through: { attributes: ["forAll"] },
        include: [{ model: Branch, attributes: ["branchName"] }],
      },
      { model: ActivityDetailDoc },
    ],
  });

  if (!activitydetail)
    return res
      .status(404)
      .send("Activity Details with the given ID was not found.");
  return res.send(activitydetail);
});

app.get("/category/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  const isPresent = await Category.findByPk(categoryId);
  if (!isPresent)
    return res.status(404).send("Category with the given ID was not found.");

  const activitydetail = await ActivityDetail.findAll({
    where: { categoryId },
    order: ['title'],
    include: ['Category', 'NOA'],
  });

  if (!activitydetail)
    return res
      .status(404)
      .send("Activity Details with the given ID was not found.");

  return res.send(activitydetail);
});

app.post("/", authorization(access.ACTIVITYDETAIL_CREATE), async (req, res) => {
  let {
    title,
    hours,
    sDate,
    eDate,
    points,
    categoryId,
    docRequired,
    active,
    studentHead,
    noaId,
  } = req.body;

  if (!docRequired) {
    docRequired = false;
  }
  if (!active) {
    active = false;
  }

  const categoryPresent = await Category.findByPk(categoryId);

  if (!categoryPresent)
    return res.status(404).send("Category with the given ID was not found.");

  const noaPresent = await NOA.findByPk(noaId);

  if (!noaPresent)
    return res.status(404).send("NOA with the given ID was not found.");

  const activitydetail = await ActivityDetail.create({
    title,
    hours,
    sDate,
    eDate,
    points,
    categoryId,
    docRequired,
    active,
    studentHead,
    noaId,
  });

  return res.send(activitydetail);
});

app.put(
  "/:activityDetailId",
  authorization(access.ACTIVITYDETAIL_UPDATE),
  async (req, res) => {
    let {
      title,
      hours,
      sDate,
      eDate,
      points,
      categoryId,
      docRequired,
      active,
      studentHead,
      noaId,
    } = req.body;
    const { activityDetailId } = req.params;

    if (!docRequired) {
      docRequired = false;
    }
    if (!active) {
      active = false;
    }
    const isActivity = await ActivityDetail.findByPk(activityDetailId);

    if (!isActivity)
      return res
        .status(404)
        .send("Activity Detail with the given ID was not found.");

    const categoryPresent = await Category.findByPk(categoryId);

    if (!categoryPresent)
      return res.status(404).send("Category with the given ID was not found.");

    const noaPresent = await NOA.findByPk(noaId);

    if (!noaPresent)
      return res.status(404).send("NOA with the given ID was not found.");

    const updatedActivityDetail = await ActivityDetail.update(
      {
        title,
        hours,
        sDate,
        eDate,
        points,
        categoryId,
        docRequired,
        active,
        studentHead,
        noaId,
      },
      { where: { id: activityDetailId } }
    );

    await isActivity.reload();

    if (updatedActivityDetail[0] == 1) return res.send(isActivity);
  }
);

app.delete(
  "/:activityDetailId",
  authorization(access.ACTIVITYDETAIL_DELETE),
  async (req, res) => {
    const activityDetailId = req.params.activityDetailId;

    const isPresent = await ActivityDetail.findByPk(activityDetailId);

    if (!isPresent)
      return res
        .status(404)
        .send("Activity Detail with the given ID was not found.");

    const deletedActivityDetails = await ActivityDetail.destroy({
      where: { id: activityDetailId },
    });

    if (deletedActivityDetails == 1) return res.send(isPresent);
  }
);

app.get("/map/:activityDetailId", async (req, res) => {
  const activityDetailId = req.params.activityDetailId;
  const activitydetail = await ActivityDetail.findOne({
    attributes: [],
    where: { id: activityDetailId },
    include: [
      {
        model: Faculty,
        through: { attributes: ["forAll", "id"] },
        include: [
          {
            model: Branch,
            attributes: ["branchName"],
          },
        ],
      },
    ],
  });

  if (!activitydetail)
    return res
      .status(404)
      .send("Activity Details with the given ID was not found.");
  return res.send(activitydetail);
});

app.post("/map", authorization(access.ACTIVITYDETAIL_MAP), async (req, res) => {
  const facultyIds = req.body.facultyIds; // Faculty id array
  let forAll = req.body.forAll; //boolean
  const activityDetailId = req.body.activityDetailId;

  const isPresent = await ActivityDetail.findByPk(activityDetailId);

  if (!isPresent)
    return res
      .status(404)
      .send("Activity Detail with the given ID was not found.");

  // console.log(forAll);
  if (!forAll) {
    forAll = 0;
  }

  const faculties = await Faculty.findAll({
    where: {
      id: {
        [Op.in]: facultyIds,
      },
    },
    attributes: ["id", "firstName", "lastName"],
  });

  // console.log(faculties);
  const ids = faculties.map((faculty) => faculty.id);
  // console.log(ids);

  if (facultyIds.length != ids.length)
    return res.status(404).send("Some of faculty ids are not valid.");

  const facultyNames = new Object(); //{}

  faculties.forEach((faculty) => {
    facultyNames[faculty.id] = `${faculty.firstName} ${faculty.lastName}`;
  });

  // console.log(facultyNames);

  let alreadyDone = [];
  let createdMapping = [];
  if (facultyIds && facultyIds.length != 0) {
    for (var i = 0; i < facultyIds.length; i++) {
      let facultyId = facultyIds[i];
      let [newRecord, isNew] = await FactActMap.findOrCreate({
        where: { facultyId, activityDetailId },
        defaults: { facultyId, activityDetailId, forAll },
      });
      // console.log(isNew);
      if (!isNew) {
        alreadyDone.push(facultyNames[facultyId]);
      } else {
        createdMapping.push(facultyNames[facultyId]);
      }
    }

    return res.send({
      alreadyDone,
      createdMapping,
      activityName: isPresent.title,
    });
  } else {
    return res.status(404).send("Faculty with the given ID was not found.");
  }
});

app.delete(
  "/map/:id",
  authorization(access.ACTIVITYDETAIL_MAP),
  async (req, res) => {
    const { id } = req.params;

    const isPresent = await FactActMap.findByPk(id);

    if (!isPresent)
      return res.status(404).send("Doc with the given ID was not found.");

    const deletedDoc = await FactActMap.destroy({
      where: { id: id },
    });

    if (deletedDoc == 1) return res.send(isPresent);
  }
);

//ActivityDetailDoc

app.get(
  "/docs/:activityDetailId",
  authorization(access.ACTIVITY_DOC_GET),
  async (req, res) => {
    const { activityDetailId } = req.params;

    const activitydetail = await ActivityDetail.findByPk(activityDetailId);
    if (!activitydetail)
      return res
        .status(404)
        .send("Activity Details with the given ID was not found.");

    const docs = await ActivityDetailDoc.findAll({
      where: { activityDetailId },
    });

    return res.send(docs);
  }
);

app.post(
  "/docs",
  authorization(access.ACTIVITY_DOC_CREATE),
  async (req, res) => {
    const { activityDetailId, title, docUrl } = req.body;

    const activitydetail = await ActivityDetail.findByPk(activityDetailId);
    if (!activitydetail)
      return res
        .status(404)
        .send("Activity Details with the given ID was not found.");

    const doc = await ActivityDetailDoc.create({
      title,
      docUrl,
      activityDetailId,
    });

    return res.send(doc);
  }
);

app.put(
  "/docs/:docId",
  authorization(access.ACTIVITY_DOC_UPDATE),
  async (req, res) => {
    const { docId } = req.params;
    const { title, docUrl } = req.body;

    const doc = await ActivityDetailDoc.findByPk(docId);
    if (!doc)
      return res.status(404).send("Doc with the given ID was not found.");

    const updatedDoc = await ActivityDetailDoc.update(
      { title, docUrl },
      { where: { id: docId } }
    );

    await doc.reload();

    if (updatedDoc[0] == 1) return res.send(doc);
  }
);

app.delete(
  "/docs/:docId",
  authorization(access.ACTIVITY_DOC_DELETE),
  async (req, res) => {
    const { docId } = req.params;

    const isPresent = await ActivityDetailDoc.findByPk(docId);

    if (!isPresent)
      return res.status(404).send("Doc with the given ID was not found.");

    const deletedDoc = await ActivityDetailDoc.destroy({
      where: { id: docId },
    });

    if (deletedDoc == 1) return res.send(isPresent);
  }
);

module.exports = app;
