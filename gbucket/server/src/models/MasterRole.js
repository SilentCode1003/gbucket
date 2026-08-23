'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MasterRole extends Model {}

  MasterRole.init({
    mr_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mr_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    mr_create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    mr_create_by: {
      type: DataTypes.STRING(300),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'MasterRole',
    tableName: 'master_role',
    timestamps: false // Using custom mr_create_at column
  });

  return MasterRole;
};