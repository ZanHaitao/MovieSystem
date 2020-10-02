const { Sequelize } = require("sequelize");
const { sqlLogger } = require('../logger');

module.exports = new Sequelize('moviedb','root','15556677737',{
    host:'localhost',
    logging:(msg)=>{
        sqlLogger.debug(msg);
    },
    dialect:'mysql'
})
