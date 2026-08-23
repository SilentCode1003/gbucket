'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('master_route', [
      {
        mr_id: 1,
        mr_route: '/api/v1/users',
        mr_route_name: 'User Management',
        mr_create_at: new Date(),
        mr_create_by: 'System'
      },
      {
        mr_id: 2,
        mr_route: '/api/v1/roles',
        mr_route_name: 'Role Management',
        mr_create_at: new Date(),
        mr_create_by: 'System'
      },
      {
        mr_id: 3,
        mr_route: '/api/v1/files',
        mr_route_name: 'File Management',
        mr_create_at: new Date(),
        mr_create_by: 'System'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('master_route', null, {});
  }
};