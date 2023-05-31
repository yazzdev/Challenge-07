'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {

    static associate(models) {
      // relasi many-to-many --> Components
      Products.hasMany(models.product_components, {
        foreignKey: 'product_id',
        as: 'product_components',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Products.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};