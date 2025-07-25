const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.cjs');

const Rents = sequelize.define('rents', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_renter: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  date_in: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_out: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: false,
});

module.exports = Rents;
