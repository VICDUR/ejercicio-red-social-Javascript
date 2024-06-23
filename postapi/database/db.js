const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbadmin', 'adminredsocial', 'YWRtaW5pc3RyYXRvcgo=', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
