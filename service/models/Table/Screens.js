const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 影厅表
 */
module.exports = sequelize.define('Screens', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seat: {
        type: DataTypes.STRING(10000),
        allowNull: false
    }
}, {
    createdAt:true,
    updatedAt:true,
    paranoid:true
})