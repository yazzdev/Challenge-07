const { Suppliers } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const suppliers = await Suppliers.findAll({
        attributes: ['id', 'name', 'address'],
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: suppliers
      });
    } catch (error) {
      throw error;
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;

      const suppliers = await Suppliers.findOne({
        where: { id: `${id}` },
        attributes: ['id', 'name', 'address'],
      });

      (suppliers) ? res.status(200).json({
        status: true,
        message: 'success',
        data: suppliers
      }) : res.status(404).json({
        status: false,
        message: `Supplier not found!`,
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  store: async (req, res) => {
    try {
      const { name, address } = req.body;

      if (!name || !address) {
        return res.status(400).json({
          status: false,
          message: 'Supplier Name and Address is required!',
          data: null
        });
      }

      const suppliers = await Suppliers.create({
        name: name,
        address: address
      });

      return res.status(201).json({
        status: true,
        message: 'Supplier added successfully',
        data: suppliers
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Suppliers.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Supplier not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Supplier update successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Suppliers.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `Supplier not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Supplier deleted successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}