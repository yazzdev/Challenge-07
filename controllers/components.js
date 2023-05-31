const { Components, Suppliers, component_suppliers } = require('../models');

module.exports = {
  index: async (req, res) => {
    try {
      const components = await Components.findAll({
        attributes: ['id', 'name', 'description'],
        include: [
          {
            model: component_suppliers,
            as: 'component_suppliers',
            attributes: ['id'],
            include: [
              {
                model: Suppliers,
                as: 'suppliers',
                attributes: ['name', 'address']
              }
            ]
          }
        ]
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: components
      });
    } catch (error) {
      throw error;
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;

      const components = await Components.findOne({
        where: { id: `${id}` },
        attributes: ['id', 'name', 'description'],
        include: [
          {
            model: component_suppliers,
            as: 'component_suppliers',
            attributes: ['id'],
            include: [
              {
                model: Suppliers,
                as: 'suppliers',
                attributes: ['name', 'address']
              }
            ]
          }
        ]
      });

      (components) ? res.status(200).json({
        status: true,
        message: 'success',
        data: components
      }) : res.status(404).json({
        status: false,
        message: `Component not found!`,
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  store: async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).json({
          status: false,
          message: 'Component Name and Description is required!',
          data: null
        });
      }

      const components = await Components.create({
        name: name,
        description: description
      });

      return res.status(201).json({
        status: true,
        message: 'Component added successfully',
        data: components
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Components.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Component not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Component updated successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Components.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `Component not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Component deleted successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  addSupplierComponents: async (req, res) => {
    try {
      const { supplier_id, component_id } = req.body;

      //TODO validasi data dari tabel lain, apabila tidak ada maka response error
      const supplier = await Suppliers.findOne({ where: { id: supplier_id } });
      const component = await Components.findOne({ where: { id: component_id } });

      if (!supplier || !component) {
        return res.status(404).json({
          status: false,
          message: `Supplier or Component not found!`,
          data: null
        });
      }

      const componentSuppliers = await component_suppliers.create({ supplier_id, component_id });

      return res.status(201).json({
        status: true,
        message: 'Component-Supplier added successfully',
        data: componentSuppliers
      });
    } catch (error) {
      throw error;
    }
  },
  updateSupplierComponents: async (req, res) => {
    try {
      const { id } = req.params;
      const { supplier_id, component_id } = req.body;

      const updated = await component_suppliers.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Component-Supplier not found!`,
          data: null
        });
      }

      //TODO validasi data dari tabel lain, apabila tidak ada maka response error
      const supplier = await Suppliers.findOne({ where: { id: supplier_id } });

      if (!supplier) {
        return res.status(404).json({
          status: false,
          message: `Supplier not found!`,
          data: null
        });
      }

      const component = await Components.findOne({ where: { id: component_id } });

      if (!component) {
        return res.status(404).json({
          status: false,
          message: `Component not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Component-Supplier updated successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroySupplierComponents: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await component_suppliers.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `Component-Supplier not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Component-Supplier deleted successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}