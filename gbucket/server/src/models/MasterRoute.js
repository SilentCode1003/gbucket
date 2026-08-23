'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MasterRoute extends Model {}

  MasterRoute.init({
    mr_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mr_route: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    mr_route_name: {
      type: DataTypes.STRING(300),
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
    modelName: 'MasterRoute',
    tableName: 'master_route',
    timestamps: false // Using custom mr_create_at column
  });

  return MasterRoute;
};