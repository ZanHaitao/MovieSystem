const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 地区城市表
 */
module.exports = sequelize.define('City',{
    province:{
        type:DataTypes.STRING,
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    createdAt: true,
    updatedAt: true,
    paranoid: true
})