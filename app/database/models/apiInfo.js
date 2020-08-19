import Sequelize from 'sequelize';
import sequelize from '../sequelize';

module.exports = sequelize.define(
  'apiInfo',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    }, 
    htmlUrl: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      default: Date.now(),
    },
    openIssues: {
      type: Sequelize.INTEGER,
    },
    watchers: {
      type: Sequelize.INTEGER
    }, 
    ownerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatarUrl: {
      type: Sequelize.STRING,
    },
    ownerHtmlUrl: {
      type: Sequelize.STRING,
    },
    ownerType: {
      type: Sequelize.STRING,
    },
    siteAdmin: {
      type: Sequelize.BOOLEAN,
    }, 
  }, {
    freezeTableName: true,
    timestamps: false,
  }
)