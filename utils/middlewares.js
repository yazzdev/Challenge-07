const jwt = require('jsonwebtoken');
const role = require('../controllers/rbac/role');
const { JWT_SECRET_KEY } = process.env;
const { Module, RoleAccess } = require('../models');

module.exports = {
  auth: async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      console.log('TOKEN :', authorization);
      if (!authorization) {
        return res.status(401).json({
          status: false,
          message: 'you\'re not authorized!',
          data: null
        });
      }

      const data = await jwt.verify(authorization, JWT_SECRET_KEY);
      req.user = {
        id: data.id,
        name: data.name,
        email: data.email,
        role_id: data.role_id
      };

      next();
    } catch (err) {
      next(err);
    }
  },

  rbac: (moduleName, is_read = false, is_write = false) => {
    return async (req, res, next) => {
      try {
        // dapatkan role_id dari data user
        const { role_id } = req.user;
        // validasi role_id
        if (!role_id) {
          return res.status(401).json({
            status: false,
            message: 'you\'re not authorized!',
            data: null
          });
        }

        // cari module where name = moduleName
        const module = await Module.findOne({ where: { name: moduleName } });
        if (!module) {
          return res.status(401).json({
            status: false,
            message: 'you\'re not authorized!',
            data: null
          });
        }

        // cari role access where role_id = role_id and module_id = module.id
        const roleAccess = await RoleAccess.findOne({ where: { module_id: module.id, role_id: role_id } });
        console.log(roleAccess);
        if (!roleAccess) return res.status(401).json({ status: false, message: 'you\'re not authorized!', data: null });

        console.log('rbac read :', is_read);
        console.log('user read :', roleAccess.is_read);

        console.log('rbac write :', is_write);
        console.log('user write :', roleAccess.is_write);


        // cocokkan isread dan iswrite yang ada di roleacess dengan parameter
        if (is_read && !roleAccess.is_read) return res.status(401).json({ status: false, message: 'you\'re not authorized!', data: null });
        if (is_write && !roleAccess.is_write) return res.status(401).json({ status: false, message: 'you\'re not authorized!', data: null });

        next();
      } catch (err) {
        next(err);
      }
    };
  }
};