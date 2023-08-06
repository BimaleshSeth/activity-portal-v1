const sequelize = require('../utils/db');

const { Sequelize, DataTypes } = require('sequelize');

const Category = sequelize.define('Category',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoryName:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'Category'
});

module.exports = { Category }