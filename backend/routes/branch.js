const app = require("express").Router();
const authorization = require("../middleware/authorization");
const access = require("../access");
const { Branch } = require("../models/branch");

app.get("/", async (req, res) => {
  return res.send(await Branch.findAll({ order: ["branchName"] }));
});

app.get("/:branchId", async (req, res) => {
  const branchId = req.params.branchId;
  const branch = await Branch.findByPk(branchId);

  if (!branch)
    return res.status(404).send("Degree with the given ID was not found.");

  return res.send(branch);
});

app.post("/", authorization(access.BRANCH_CREATE), async (req, res) => {
  const branchName = req.body.branchName;
  const branch = await Branch.create({ branchName });
  return res.send(branch);
});

app.put("/:branchId", authorization(access.BRANCH_UPDATE), async (req, res) => {
  const branchId = req.params.branchId;
  const branchName = req.body.branchName;

  const branch = await Branch.findByPk(branchId);
  if (!branch)
    return res.status(404).send("Branch with the given ID was not found.");

  const isUpdated = await Branch.update(
    { branchName },
    { where: { id: branchId } }
  );
  // console.log(isUpdated);

  await branch.reload();

  if (isUpdated[0] == 1) return res.send(branch);
});

app.delete(
  "/:branchId",
  authorization(access.BRANCH_DELETE),
  async (req, res) => {
    const branchId = req.params.branchId;
    const branch = await Branch.findByPk(branchId);
    if (!branch)
      return res.status(404).send("Branch with the given ID was not found.");

    const isDeleted = await Branch.destroy({ where: { id: branchId } });
    if (isDeleted == 1) return res.send(branch);
  }
);

module.exports = app;
