const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.cjs');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(30),
  },
  patronymic: {
    type: DataTypes.STRING(30),
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
{
  timestamps: false,
}
);

module.exports = Users;
