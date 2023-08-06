const sequelize = require("../utils/db");
const { Sequelize, DataTypes } = require("sequelize");

const Degree = sequelize.define(
  "Degree",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    degreeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    years: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "degree",
  }
);

const Semester = sequelize.define(
  "Semester",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "semester",
  }
);

// (async () => {
//   const semesters = await Semester.findAll();
//   // console.log(semesters);
//   if (semesters && semesters.length == 0) {
//     // console.log('I\'m In');
//     let mysemesters = await Semester.bulkCreate([
//       { semester: 1 },
//       { semester: 2 },
//       { semester: 3 },
//       { semester: 4 },
//       { semester: 5 },
//       { semester: 6 },
//       { semester: 7 },
//       { semester: 8 },
//     ]);
//     //    console.log(mysemesters);
//   }
// })();

module.exports = { Degree, Semester };
