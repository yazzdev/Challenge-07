const { Suppliers, Components, Products, product_components } = require('../models');

module.exports = {
  truncateSupplier: async () => {
    try {
      await Suppliers.destroy({ truncate: { cascade: true } });
    } catch (error) {
      throw error;
    }
  },
  truncateComponent: async () => {
    try {
      await Components.destroy({ truncate: { cascade: true } });
    } catch (error) {
      throw error;
    }
  },
  truncateProduct: async () => {
    try {
      await Products.destroy({ truncate: { cascade: true } });
    } catch (error) {
      throw error;
    }
  },
  truncateProductComponents: async () => {
    try {
      await product_components.destroy({ truncate: { cascade: true } });
    } catch (error) {
      throw error;
    }
  },
  truncateComponentSuppliers: async () => {
    try {
      await component_suppliers.destroy({ truncate: { cascade: true } });
    } catch (error) {
      throw error;
    }
  }
};