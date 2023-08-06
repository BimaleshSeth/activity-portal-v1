const app = require("express").Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { Student, Faculty } = require("../models/users");

app.post("/", async (req, res) => {
  const { erpId, password } = req.body;
  let user;
  if (erpId[0] == "S") {
    user = await Student.findOne({
      where: { erpId, verified: true },
      include: ["Branch", "Degree", "Semester"],
    });
  } else if (erpId[0] == "E") {
    user = await Faculty.findOne({
      where: { erpId, verified: true },
      include: "Branch",
    });
  }
  if (!user) return res.status(400).send("User not found!");

  if (user.password == password) {
    const token = user.generateAuthToken();
    // console.log(token);
    return res.header("x-auth-token", token).send(user);
  } else {
    return res.status(400).send("Incorrect Password!");
  }
});

app.get("/me", authentication, async (req, res) => {
  const { id, accessCode } = req.user;
  let user = null;
  if (accessCode == "Student") {
    user = await Student.findOne({
      where: { id },
      include: ["Branch", "Semester", "Degree"],
    });
  } else {
    user = await Faculty.findOne({ where: { id }, include: "Branch" });
  }

  if (!user)
    return res.status(404).send("User with the given ID was not found.");

  return res.send(user);
});

module.exports = app;
