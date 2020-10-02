const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 影院服务
 */
module.exports = sequelize.define('MovieService', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})