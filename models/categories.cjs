const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.cjs');

const Categories = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
    }
}, {
    timestamps: false
})

module.exports = Categories;