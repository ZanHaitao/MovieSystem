const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 订单表
 */
module.exports = sequelize.define('Order', {
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})