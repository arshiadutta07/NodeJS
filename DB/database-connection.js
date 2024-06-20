const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('ProjectApplication', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true
  }
});

module.exports = sequelize;
