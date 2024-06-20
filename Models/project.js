// models/project.js
const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes } = require('sequelize');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('Planned', 'In Progress', 'Completed'), allowNull: false },
  project_manager_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' }},
  client_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' }},
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW},
}, {
  tableName: 'Projects',
  timestamps: true,
});

// Define associations here
Project.associate = (models) => {
  Project.belongsTo(models.User, { as: 'projectManager', foreignKey: 'project_manager_id' });
  Project.belongsTo(models.User, { as: 'client', foreignKey: 'client_id' });
};

module.exports = Project;
