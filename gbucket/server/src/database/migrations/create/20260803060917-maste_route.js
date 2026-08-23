'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_route', {
      mr_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mr_route: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      mr_route_name: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      mr_create_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      mr_create_by: {
        type: Sequelize.STRING(300),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_route');
  }
};