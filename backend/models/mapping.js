const sequelize = require('../utils/db');
const { Sequelize, DataTypes } = require('sequelize');
const { Faculty, Student } = require('./users');
const { ActivityDetail } = require('./activityDetails');
const { Semester } = require('./degrees');

const FactActMap = sequelize.define('FactActMap', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	facultyId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Faculty,
			key: 'id'
		}
	},
	activityDetailId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: ActivityDetail,
			key: 'id'
		}
	},
	forAll: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	}
}, {
	tableName: 'fact_act_map'
});

const Activity = sequelize.define('Activity', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	studentId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Student,
			key: 'id'
		}
	},
	activityDetailId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: ActivityDetail,
			key: 'id'
		}
	},
	semesterId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Semester,
			key: 'id'
		}
	},
	verifiedBy : {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: Faculty,
			key: 'id'
		}
	},
	certificate:{
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null
	},
	status:{
		type: DataTypes.BOOLEAN,
		allowNull: true
	},
	comment:{
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	tableName: 'activity'
});


module.exports = { FactActMap, Activity };