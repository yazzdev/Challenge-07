const express = require('express');
const router = express.Router();
const { suppliers } = require('../controllers/rbac');

router.get('/', suppliers.index);
router.get('/:id', suppliers.show);
router.post('/', suppliers.store);
router.put('/:id', suppliers.update);
router.delete('/:id', suppliers.destroy);

module.exports = router;