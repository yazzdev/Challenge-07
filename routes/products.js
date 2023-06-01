const express = require('express');
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');

router.get('/', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.products.index);
router.get('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.products.show);
router.post('/', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, true, false, false), rbac.products.store);
router.put('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, true, false), rbac.products.update);
router.delete('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, true), rbac.products.destroy);
router.put('/product-components/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, true, false), rbac.products.updateProductComponents)

module.exports = router;