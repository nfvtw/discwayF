const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.cjs');

const Reviews = sequelize.define('reviews', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_renter: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
    },
    date_comment: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

module.exports = Reviews;