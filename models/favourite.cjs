const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.cjs');

const Favourites = sequelize.define('favourites', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
});

module.exports = Favourites;