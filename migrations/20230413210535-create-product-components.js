'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_components', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      component_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('product_components', {
      fields: ['product_id'],
      type: 'foreign key',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('product_components', {
      fields: ['component_id'],
      type: 'foreign key',
      references: {
        table: 'Components',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('product_components', 'product_id');
    // await queryInterface.removeConstraint('product_components', 'component_id');
    await queryInterface.dropTable('product_components');
  }
};