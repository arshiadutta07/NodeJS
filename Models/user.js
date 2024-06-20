// models/user.js
const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes} = require('sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  displayName: { type: DataTypes.STRING, allowNull: true },
  userName: { type: DataTypes.STRING, unique: true, allowNull: false},
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true},
  googleId: {type: DataTypes.STRING, unique: true, allowNull: true},
  linkedInId: {type: DataTypes.STRING, unique: true, allowNull: true},
  role: { type: DataTypes.ENUM('SuperAdmin', 'Admin', 'Client'), allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW},
}, {
  tableName: 'Users',
  timestamps: true,
});

// Define associations here
User.associate = (models) => {
  User.hasMany(models.Project, { foreignKey: 'project_manager_id', as: 'managedProjects' });
  User.hasMany(models.Project, { foreignKey: 'client_id', as: 'clientProjects' });
  User.hasMany(models.AuditLog, { foreignKey: 'user_id' });
};

module.exports = User;
