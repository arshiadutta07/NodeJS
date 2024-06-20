const sequelize = require('../DB/database-connection');
const User = require('./user');
const Project = require('./project');
const AuditLog = require('./auditLog');

// Initialize models
const models = {
  User,
  Project,
  AuditLog
};

// Define associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
