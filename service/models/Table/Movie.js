const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 电影信息表
 */
module.exports = sequelize.define('Movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    region:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.STRING,
        allowNull: false
    },
    income: {
        type: DataTypes.STRING,
        allowNull: false
    },
    introduce: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    imgUrl:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})