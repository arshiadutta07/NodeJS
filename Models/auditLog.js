// models/auditLog.js
const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes } = require('sequelize');

const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' }},
  action: { type: DataTypes.STRING, allowNull: false },
  entity: { type: DataTypes.STRING, allowNull: false },
  entity_id: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW},
}, {
  tableName: 'AuditLogs',
  timestamps: false,
});

// Define associations here
AuditLog.associate = (models) => {
  AuditLog.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = AuditLog;
