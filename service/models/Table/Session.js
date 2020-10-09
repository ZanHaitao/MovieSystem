const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 电影场次表
 */
module.exports = sequelize.define('Session', {
    showDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    showTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seat: {
        type: DataTypes.STRING(2000),
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})