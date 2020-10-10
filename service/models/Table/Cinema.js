const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 影院表
 */
module.exports = sequelize.define('Cinema', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})