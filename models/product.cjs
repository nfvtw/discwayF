const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.cjs');

const Products = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  overview: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
  }
}, {
  timestamps: false,
});

module.exports = Products;
