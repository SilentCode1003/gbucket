'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SystemLog extends Model {}

  SystemLog.init({
    sl_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sl_description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    sl_create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'SystemLog',
    tableName: 'system_logs',
    timestamps: false // Using custom sl_create_at timestamp
  });

  return SystemLog;
};