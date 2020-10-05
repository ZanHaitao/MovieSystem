const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 用户表
 */
module.exports = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginId: {
        type: DataTypes.STRING,
        allowNull: false,
        // primaryKey: true
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})