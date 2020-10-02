const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 管理员表
 */
module.exports = sequelize.define('Admin', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})