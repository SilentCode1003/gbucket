'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_token', {
      mt_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      mt_web_service: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      mt_token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      my_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      my_create_by: {
        type: Sequelize.STRING(300),
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_token');
  }
};