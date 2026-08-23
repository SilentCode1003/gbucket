'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file', {
      f_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      f_file_type: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      f_path: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      f_url: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      f_web_service: {
        type: Sequelize.STRING(300),
        allowNull: false,
        comment: 'HRPAY, BMS and other service that will store files'
      },
      f_upload_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('file');
  }
};