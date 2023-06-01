const express = require('express');
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');


router.get('/', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, false, false), rbac.components.index);
router.get('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, false, false), rbac.components.show);
router.post('/', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, true, false, false), rbac.components.store);
router.put('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, true, false), rbac.components.update);
router.delete('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, false, true), rbac.components.destroy);
router.post('/component-suppliers/', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, true, false, false), rbac.components.addSupplierComponents);
router.put('/component-suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, true, false), rbac.components.updateSupplierComponents);
router.delete('/component-suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, false, true), rbac.components.destroySupplierComponents);

module.exports = router;