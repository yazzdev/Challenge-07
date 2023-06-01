const express = require('express');
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');

router.get('/', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.suppliers.index);
router.get('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.suppliers.show);
router.post('/', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, true, false, false), rbac.suppliers.store);
router.put('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, true, false), rbac.suppliers.update);
router.delete('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, true), rbac.suppliers.destroy);

module.exports = router;