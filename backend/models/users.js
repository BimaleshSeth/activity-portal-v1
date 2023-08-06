const sequelize = require("../utils/db");
const jwt = require("jsonwebtoken");
const config = require("config");
const { Sequelize, DataTypes } = require("sequelize");

const condition = new Object();
let expiresIn = config.get("jwtPrivateKeyExpiry");
if (expiresIn) {
  condition["expiresIn"] = expiresIn;
}
// console.log('JWT Condition : ', condition);

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentType: {
      type: DataTypes.ENUM,
      values: ["Regular", "DSE"],
      allowNull: false,
    },
    erpId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rollNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    division: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessCode: {
      type: DataTypes.STRING,
      defaultValue: "Student",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "students",
  }
);

Student.prototype.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this.id, accessCode: this.accessCode },
    config.get("jwtPrivateKey"),
    condition
  );
  return token;
};

const Faculty = sequelize.define(
  "Faculty",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // name: {
    //     type: DataTypes.VIRTUAL,
    //     get() {
    //         return `${this.firstName} ${this.lastName}`;
    //     },
    //     set(value) {
    //         throw new Error('Do not try to set the `fullName` value!');
    //     }
    // },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    erpId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessCode: {
      type: DataTypes.STRING,
      defaultValue: "Faculty",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Faculties",
  }
);

Faculty.prototype.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this.id, accessCode: this.accessCode },
    config.get("jwtPrivateKey"),
    condition
  );
  return token;
};

module.exports = { Student, Faculty };
