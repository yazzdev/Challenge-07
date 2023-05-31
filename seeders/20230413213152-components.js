'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Components', [
      {
        name: 'Flour',
        description: 'Basic ingredient for making bread',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sugar',
        description: 'Sweetener for making pastries',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Butter',
        description: 'Ingredient for making croissants',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Components', null, {});
  }
};
