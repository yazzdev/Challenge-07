'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {

    static associate(models) {
      Employee.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
  }
  Employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    user_type: DataTypes.STRING,
    isActivated: DataTypes.BOOLEAN,
    profilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};