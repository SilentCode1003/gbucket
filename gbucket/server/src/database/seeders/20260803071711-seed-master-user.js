'use strict';

const bcrypt = require('bcryptjs');
const { EncryptString } = require('../../utilities/cryptography.util');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPassword = EncryptString('Admin@123');
    const userPassword = EncryptString('User@123');

    await queryInterface.bulkInsert('master_user', [
      {
        mu_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        mu_fullname: 'Super Admin',
        mu_username: 'superadmin',
        mu_password: adminPassword,
        mu_role: 1, // References mr_id = 1 (Super Admin)
        mu_is_active: 'active',
        mu_create_at: new Date(),
        mu_create_by: 'System'
      },
      {
        mu_id: 'b1fec999-0d1c-5fa9-cc7e-7cc0ce491b22',
        mu_fullname: 'John Doe',
        mu_username: 'johndoe',
        mu_password: userPassword,
        mu_role: 3, // References mr_id = 3 (User)
        mu_is_active: 'active',
        mu_create_at: new Date(),
        mu_create_by: 'System'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('master_user', {
      mu_id: [
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'b1fec999-0d1c-5fa9-cc7e-7cc0ce491b22'
      ]
    }, {});
  }
};