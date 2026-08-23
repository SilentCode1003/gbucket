'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('master_role', [
      {
        mr_id: 1,
        mr_name: 'Super Admin',
        mr_create_at: new Date(),
        mr_create_by: 'System'
      },
      {
        mr_id: 2,
        mr_name: 'Admin',
        mr_create_at: new Date(),
        mr_create_by: 'System'
      },
      {
        mr_id: 3,
        mr_name: 'User',
        mr_create_at: new Date(),
        mr_create_by: 'System'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('master_role', null, {});
  }
};