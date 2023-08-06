const app = require("express").Router();
const authorization = require("../middleware/authorization");
const access = require("../access");
const { Semester } = require("../models/degrees");

app.get("/", async (req, res) => {
  return res.send(await Semester.findAll());
});

app.get("/:semesterId", async (req, res) => {
  const semesterId = req.params.semesterId;
  const semester = await Semester.findByPk(semesterId);

  if (!semester)
    return res.status(404).send("Degree with the given ID was not found.");

  return res.send(semester);
});

app.post("/", authorization(access.SEMESTER_CREATE), async (req, res) => {
  const semester = req.body.semester;
  const sem = await Semester.create({ semester: semester });
  res.send(sem);
});

app.put(
  "/:semesterId",
  authorization(access.SEMESTER_UPDATE),
  async (req, res) => {
    const semesterId = req.params.semesterId;
    const semester = req.body.semester;

    const sem = await Semester.findByPk(semesterId);
    if (!sem)
      return res.status(404).send("Semester with the given ID was not found.");

    // const isUpdated = await Semester.update({ semester },{ where: { id : semesterId }});
    sem.semester = semester;
    await sem.save();
    await sem.reload();
    // console.log(isUpdated);

    return res.send(sem);

    // if(isUpdated[0] == 1) return res.send(sem);
  }
);

app.delete(
  "/:semesterId",
  authorization(access.SEMESTER_DELETE),
  async (req, res) => {
    const semesterId = req.params.semesterId;
    const semester = await Semester.findByPk(semesterId);

    if (!semester)
      return res.status(404).send("Semester with the given ID was not found.");

    const isDeleted = await Semester.destroy({ where: { id: semesterId } });

    if (isDeleted == 1) return res.send(semester);
  }
);

module.exports = app;
