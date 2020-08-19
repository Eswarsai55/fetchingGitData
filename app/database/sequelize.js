import Sequelize from 'sequelize';

const {MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;
const sequelize = new Sequelize( MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize;