// models/auditLog.js
const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes } = require('sequelize');

const EmailVerificationInfo = sequelize.define('EmailVerificationInfo', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' }},
  email: { type: DataTypes.STRING, allowNull: false, unique: true},
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
  verificationStatus: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW},
}, {
  tableName: 'EmailVerificationInfos',
  timestamps: false,
});

// Define associations here
EmailVerificationInfo.associate = (models) => {
    EmailVerificationInfo.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = EmailVerificationInfo;
