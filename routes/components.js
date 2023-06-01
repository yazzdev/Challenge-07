const express = require('express');
const router = express.Router();
const { components } = require('../controllers/rbac');

router.get('/', components.index);
router.get('/:id', components.show);
router.post('/', components.store);
router.put('/:id', components.update);
router.delete('/:id', components.destroy);
router.post('/component-suppliers/', components.addSupplierComponents);
router.put('/component-suppliers/:id', components.updateSupplierComponents);
router.delete('/component-suppliers/:id', components.destroySupplierComponents);

module.exports = router;