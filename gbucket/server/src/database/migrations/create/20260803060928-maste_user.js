'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_user', {
      mu_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      mu_fullname: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      mu_username: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      mu_password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      mu_role: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mu_is_active: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
      },
      mu_create_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      mu_create_by: {
        type: Sequelize.STRING(300),
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_user');
  }
};