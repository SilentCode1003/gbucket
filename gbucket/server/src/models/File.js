'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class File extends Model {}

  File.init({
    f_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    f_file_type: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    f_path: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    f_url: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    f_web_service: {
      type: DataTypes.STRING(300),
      allowNull: false,
      comment: 'HRPAY, BMS and other service that will store files'
    },
    f_upload_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'File',
    tableName: 'file',
    timestamps: false // Using custom f_upload_at timestamp
  });

  return File;
};