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
  renter: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  date_in: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_out: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Rents;
