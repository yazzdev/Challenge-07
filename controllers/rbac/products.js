const { Products, product_components, Components } = require('../../models');

module.exports = {
  index: async (req, res) => {
    try {
      const products = await Products.findAll({
        attributes: ['id', 'name', 'quantity'],
        include: [
          {
            model: product_components,
            as: 'product_components',
            attributes: ['id'],
            include: [
              {
                model: Components,
                as: 'components',
                attributes: ['name', 'description']
              }
            ]
          }
        ]
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: products
      });
    } catch (error) {
      throw error;
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;

      const products = await Products.findOne({
        where: { id: `${id}` },
        attributes: ['id', 'name', 'quantity'],
        include: [
          {
            model: product_components,
            as: 'product_components',
            attributes: ['id'],
            include: [
              {
                model: Components,
                as: 'components',
                attributes: ['id', 'name', 'description']
              }
            ]
          }
        ]
      });

      (products) ? res.status(200).json({
        status: true,
        message: 'success',
        data: products
      }) : res.status(404).json({
        status: false,
        message: `Can't find data with id ${id}`,
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  store: async (req, res) => {
    try {
      const { name, quantity, component_id } = req.body;

      //TODO validasi data dari tabel Components
      const component = await Components.findOne({ where: { id: component_id } });
      if (!component) {
        return res.status(404).json({
          status: false,
          message: `component_id does not exist!!`,
          data: null
        })
      }

      if (!name || !quantity) {
        return res.status(400).json({
          status: false,
          message: 'name product and quantity is required!',
          data: null
        });
      }

      const product = await Products.create({
        name: name,
        quantity: quantity
      });

      const productComponents = await product_components.create({
        product_id: product.id,
        component_id: component_id
      });

      return res.status(201).json({
        status: true,
        message: 'Product added successfully',
        data: {
          product: product,
          product_components: productComponents
        }
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Products.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Product not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Product updated successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Products.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `Product not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Product deleted successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  updateProductComponents: async (req, res) => {
    try {
      const { id } = req.params;
      const { product_id, component_id } = req.body;

      const updated = await product_components.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Product-Component not found!`,
          data: null
        });
      }

      //TODO validasi data dari tabel lain, apabila tidak ada maka response error
      const product = await Products.findOne({
        where: { id: product_id }
      });
      const component = await Components.findOne({
        where: { id: component_id }
      });

      if (!product || !component) {
        return res.status(404).json({
          status: false,
          message: `Product or Component data not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Product-Component updated successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}