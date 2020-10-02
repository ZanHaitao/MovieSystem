const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 电影评价表
 */
module.exports = sequelize.define('Comments', {
    content: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    score: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishDate: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})