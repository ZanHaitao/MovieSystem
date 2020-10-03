const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 影院影厅汇总表
 */
module.exports = sequelize.define('CinemaScreens', {}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})