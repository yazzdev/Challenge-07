const express = require('express');
const router = express.Router();
const { products } = require('../controllers/rbac');

router.get('/', products.index);
router.get('/:id', products.show);
router.post('/', products.store);
router.put('/:id', products.update);
router.delete('/:id', products.destroy);
router.put('/product-components/:id', products.updateProductComponents)

module.exports = router;