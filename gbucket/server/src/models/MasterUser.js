'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MasterUser extends Model {}

  MasterUser.init({
    mu_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mu_fullname: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    mu_username: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    mu_password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mu_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mu_is_active: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false,
    },
    mu_create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    mu_create_by: {
      type: DataTypes.STRING(300),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'MasterUser',
    tableName: 'master_user',
    timestamps: false // Using custom mu_create_at timestamp
  });

  return MasterUser;
};