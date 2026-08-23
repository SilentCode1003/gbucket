'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MasterToken extends Model {}

  MasterToken.init({
    mt_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mt_web_service: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    mt_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    my_create_by: {
      type: DataTypes.STRING(300),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'MasterToken',
    tableName: 'master_token',
    timestamps: false // Using custom my_created_at timestamp
  });

  return MasterToken;
};