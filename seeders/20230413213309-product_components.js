'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_components', [
      {
        product_id: 1,
        component_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        component_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 3,
        component_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_components', null, {});
  }
};
