const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 电影类型表
 */
module.exports = sequelize.define('MovieType',{
    typeName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    createdAt:true,
    updatedAt:true,
    paranoid:true
})