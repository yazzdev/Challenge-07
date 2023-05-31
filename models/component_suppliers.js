'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class component_suppliers extends Model {

    static associate(models) {
      // relasi many-to-many : Suppliers -> Components
      
      component_suppliers.belongsTo(models.Suppliers, {
        foreignKey: 'supplier_id',
        as: 'suppliers',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      component_suppliers.belongsTo(models.Components, {
        foreignKey: 'component_id',
        as: 'components',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  component_suppliers.init({
    supplier_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'component_suppliers',
  });
  return component_suppliers;
};