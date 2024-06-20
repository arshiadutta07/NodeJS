const sequelize = require('../DB/database-connection');
const User = require('./user');
const Project = require('./project');
const AuditLog = require('./auditLog');
const EmailVerificationInfo = require('./emailVerificationDetails');

// Initialize models
const models = {
  User,
  Project,
  AuditLog,
  EmailVerificationInfo
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
