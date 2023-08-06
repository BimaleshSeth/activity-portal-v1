const { Sequelize } = require('sequelize');
const config = require('config');
const DB_URI = config.get('dbUri');
const DB_USER = config.get('dbUser');
const DB_PASSWORD = config.get('dbPassword');
const DB_NAME = config.get('dbName');
const DB_TYPE = config.get('dbType')

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_URI,
  dialect: DB_TYPE,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;