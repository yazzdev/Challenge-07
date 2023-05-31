'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Bread',
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Croissant',
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cupcake',
        quantity: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
