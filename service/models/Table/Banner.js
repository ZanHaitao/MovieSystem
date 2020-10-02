const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * banner广告
 */
module.exports = sequelize.define('Banner', {
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})