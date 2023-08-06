const app = require("express").Router();
const authorization = require("../middleware/authorization");
const access = require("../access");
const { Student, Faculty } = require("../models/users");

app.post("/reset", authorization(access.PASSWORD_RESET), async (req, res) => {
  const { erpId } = req.body;
  let user;
  if (erpId[0] == "S") {
    user = await Student.findOne({ where: { erpId, verified: true } });
  } else if (erpId[0] == "E") {
    user = await Faculty.findOne({ where: { erpId, verified: true } });
  }
  if (!user) return res.status(400).send("User not found!");

  user.password = user.erpId;
  await user.save();

  return res.send("Password reset successfully!");
});

app.post("/change", async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  let user = req.user;

  if (user.accessCode == "Student") {
    user = await Student.findByPk(user.id);
  } else {
    user = await Faculty.findByPk(user.id);
  }
  if (!user) return res.status(400).send("User not found!");

  if (oldPassword == user.password) {
    user.password = newPassword;
    await user.save();
    return res.send("Your password has been changed successfully!");
  } else {
    return res.send("You have entered incorrect password.");
  }
});

module.exports = app;
