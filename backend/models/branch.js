const sequelize = require('../utils/db');
const { DataTypes } = require('sequelize');

const Branch = sequelize.define('Branch',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    branchName:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'branch'
});


module.exports = { Branch };