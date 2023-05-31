'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Suppliers', [
      {
        name: 'Flour Co.',
        address: '123 Main St',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sugar Inc.',
        address: '456 Elm St',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Butter Co.',
        address: '789 Oak St',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Suppliers', null, {});
  }
};
