'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('component_suppliers', [
      {
        supplier_id: 1,
        component_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        supplier_id: 2,
        component_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        supplier_id: 3,
        component_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('component_suppliers', null, {});
  }
};
