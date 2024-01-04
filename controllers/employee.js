const { Employee, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const oauth2 = require('../utils/oauth2');
const imagekit = require('../utils/imagekit');
const nodemailer = require('../utils/nodemailer');

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

      const hashPassword = await bcrypt.hash(password, 10);
      const employeeData = {
        name, email, password: hashPassword
      };
      const employeeRole = await Role.findOne({ where: { name: 'User' } });
      if (employeeRole) {
        employeeData.role_id = employeeRole.id;
      }
      const employee = await Employee.create(employeeData);

      // Mengirim email aktivasi
      const activationLink = `${req.protocol}://${req.get('host')}/auth/activate/${employee.id}`;

      const html = `
        <h1>Account Activation</h1>
        <p>Hello ${employee.name}</p>
        <p>Please click the following link to activate your account:</p>
        <a href="${activationLink}" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none;">Activate Your Account</a>
      `;

      try {
        await nodemailer.sendMail(employee.email, 'Account Activation', html);
      } catch (error) {
        // Handle email sending error
        throw new Error('Failed to send activation email');
      }

      return res.status(201).json({
        status: true,
        message: 'User created! Please Check Your Email for Activate',
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

  activateAccount: async (req, res) => {
    try {
      const { id } = req.params;

      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({
          status: false,
          message: 'Employee not found!',
          data: null
        });
      }

      if (employee.isActivated) {
        return res.status(400).json({
          status: false,
          message: 'Link expired, account already active!',
          data: null
        });
      }

      // Setel status akun menjadi "aktif"
      employee.isActivated = true;
      await employee.save();

      return res.status(200).json({
        status: true,
        message: 'Account activated successfully',
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

      if (!employee.isActivated) {
        return res.status(400).json({
          status: false,
          message: 'Your account is not activated!',
          data: null
        });
      }

      if (employee.user_type == 'google' && !employee.password) {
        return res.status(400).json({
          status: false,
          message: 'your accont is registered with google oauth, you need to login with google oauth2!',
          data: null
        });
      }

      const passwordCorrect = await bcrypt.compare(password, employee.password);
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

  googleOauth2: async (req, res) => {
    try {
      const { code } = req.query;
      if (!code) {
        const googleLoginUrl = oauth2.generateAuthUrl();
        return res.redirect(googleLoginUrl);
      }

      await oauth2.setCreadentials(code);
      const { data } = await oauth2.getUserData();


      let employee = await Employee.findOne({ where: { email: data.email } });
      if (!employee) {
        employee = await Employee.create({
          name: data.name,
          email: data.email,
          role_id: 3,
          user_type: 'google'
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
  },

  uploadProfile: async (req, res) => {
    try {
      const { id } = req.user;

      const employee = await Employee.findByPk(id);

      if (!employee) {
        return res.status(404).json({
          status: false,
          message: 'Employee not found!',
          data: null
        });
      }

      const stringFile = req.file.buffer.toString('base64');

      const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile
      });

      // Memperbarui gambar profil pengguna
      employee.profilePicture = uploadFile.url;
      await employee.save();

      return res.json({
        status: true,
        message: 'Profile picture uploaded successfully',
        data: {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          profilePicture: employee.profilePicture
        }
      });
    } catch (err) {
      throw err;
    }
  }
}