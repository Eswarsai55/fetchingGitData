import sequelize from '../../../app/database/sequelize';

module.exports = () => {
  return sequelize.authenticate().then(() => {
    console.log('Database connection Successful')
    return;
  }).catch(err => {
    console.log(err);
    return Promise.reject(err);
  })
}