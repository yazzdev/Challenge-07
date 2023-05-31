'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_components extends Model {
    static associate(models) {

      // relasi many-to-many : Products -> Components
      product_components.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'products',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      product_components.belongsTo(models.Components, {
        foreignKey: 'component_id',
        as: 'components',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  product_components.init({
    product_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_components',
  });
  return product_components;
};