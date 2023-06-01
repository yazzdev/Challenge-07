'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('component_suppliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      supplier_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      component_id: {
        allowNull: true,
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

    await queryInterface.addConstraint('component_suppliers', {
      fields: ['supplier_id'],
      type: 'foreign key',
      references: { 
        table: 'Suppliers',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('component_suppliers', {
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
    // await queryInterface.removeConstraint('component_suppliers', 'supplier_id');
    // await queryInterface.removeConstraint('component_suppliers', 'component_id');
    await queryInterface.dropTable('component_suppliers');
  }
};