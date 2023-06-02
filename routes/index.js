const express = require('express');
const router = express.Router();
const suppliers = require('./suppliers');
const components = require('./components');
const products = require('./products');
const employee = require('../controllers/employee');
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const multer = require('multer')();

const middlewares = require('../utils/middlewares');

router.get('/', (req, res, next) => {
  res.status(200)
    .json({
      message: "Welcome at Home Page!!"
    });
});

router.post('/auth/register', employee.register);
router.post('/auth/login', employee.login);
router.get('/auth/whoami', middlewares.auth, employee.whoami);
router.get('/auth/oauth', employee.googleOauth2);
router.get('/auth/show', employee.show);

// bisa digunakan untuk upload profile atau update profile, tinggal memasukan gambar baru saja
router.post('/auth/upload-profile', middlewares.auth, multer.single('profilePicture'), employee.uploadProfile);


// module
router.post('/rbac/modules', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true, false, false), rbac.modules.store);
router.get('/rbac/modules', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false, false, false), rbac.modules.index);
router.get('/rbac/modules/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false, false, false), rbac.modules.show);

// role
router.post('/rbac/roles', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true, false, false), rbac.roles.store);
router.get('/rbac/roles', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false, false, false), rbac.roles.index);
router.get('/rbac/roles/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false, false, false), rbac.roles.show);

// role access
router.post('/rbac/roleaccess', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true, false, false), rbac.roleaccess.store);
router.get('/rbac/roleaccess', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false, false, false), rbac.roleaccess.index);
router.get('/rbac/roleaccess/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false, false, false), rbac.roleaccess.show);

router.use('/suppliers', suppliers);
router.use('/components', components);
router.use('/products', products);

module.exports = router;