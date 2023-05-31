'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {

    static associate(models) {
      // relasi many-to-many --> components
      Suppliers.hasMany(models.component_suppliers, {
        foreignKey: 'supplier_id',
        as: 'component_suppliers',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Suppliers.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suppliers',
  });
  return Suppliers;
};