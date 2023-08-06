const sequelize = require('../utils/db');
const { Sequelize, DataTypes } = require('sequelize');

const ActivityDetail = sequelize.define('ActivityDetail',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    hours:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    eDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    points : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    docRequired:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    },
    studentHead:{
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'activitydetails'
});


const ActivityDetailDoc = sequelize.define('ActivityDetailDoc',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    docUrl:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName:'activitydetailsdoc'
});


module.exports = { ActivityDetail, ActivityDetailDoc };