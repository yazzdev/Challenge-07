const { Employee, Role } = require('../models');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const exist = await Employee.findOne({ where: { email } });
      if (exist) {
        return res.status(400).json({
          status: false,
          message: 'email already used!',
          data: null
        });
      }

      const hashPassword = await bcryp.hash(password, 10);
      const employeeData = {
        name, email, password: hashPassword
      };
      const employeeRole = await Role.findOne({ where: { name: 'User' } });
      if (employeeRole) {
        employeeData.role_id = employeeRole.id;
      }
      const employee = await Employee.create(employeeData);
      return res.status(201).json({
        status: true,
        message: 'employee created!',
        data: {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role_id: employee.role_id
        }
      });
    } catch (error) {
      throw error;
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const employee = await Employee.findOne({ where: { email } });
      if (!employee) {
        return res.status(400).json({
          status: false,
          message: 'credential is not valid!',
          data: null
        });
      }

      const passwordCorrect = await bcryp.compare(password, employee.password);
      if (!passwordCorrect) {
        return res.status(400).json({
          status: false,
          message: 'credential is not valid!',
          data: null
        });
      }

      const payload = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role_id: employee.role_id
      };

      const token = await jwt.sign(payload, JWT_SECRET_KEY);
      return res.status(200).json({
        status: true,
        message: 'login success!',
        data: {
          token: token
        }
      });

    } catch (error) {
      throw error;
    }
  },

  whoami: async (req, res) => {
    try {
      return res.status(200).json({
        status: true,
        message: 'fetch employee success!',
        data: req.employee
      });
    } catch (error) {
      throw error;
    }
  },

  show: async (req, res) => {
    try {
      const employee = await Employee.findAll();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: employee
      });
    } catch (error) {
      throw error;
    }
  }
};